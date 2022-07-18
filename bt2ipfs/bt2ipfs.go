package main

import (
	"context"
	"fmt"
	"io"
	"math"
	"os"
	"os/signal"
	"strings"
	"sync"
	"syscall"
	"time"

	"github.com/anacrolix/torrent"
	ipfs "github.com/ipfs/go-ipfs-api"
	files "github.com/ipfs/go-ipfs-files"
)

type MagnetLink struct {
	client     *torrent.Client
	torrent    *torrent.Torrent
	reader     torrent.Reader
	url        string
	ctx        context.Context
	cancelFunc context.CancelFunc
	closeChan  chan struct{}
	closeOne   sync.Once
}

func NewMagnetLink(client *torrent.Client, url string) *MagnetLink {
	torrent, _ := client.AddMagnet(url)
	ctx, cancelFunc := context.WithCancel(context.Background())

	return &MagnetLink{
		client:     client,
		torrent:    torrent,
		url:        url,
		ctx:        ctx,
		cancelFunc: cancelFunc,
		closeChan:  make(chan struct{}),
	}
}

func (link *MagnetLink) Close() {
	link.closeOne.Do(func() {
		link.cancelFunc()
		if link.reader != nil {
			link.reader.Close()
		}
		link.torrent.Drop()
		close(link.closeChan)
	})
}

func (link *MagnetLink) GetCloseChan() chan struct{} {
	return link.closeChan
}

func (link *MagnetLink) GotInfo() bool {
	select {
	case <-link.torrent.GotInfo():
		return true
	case <-link.closeChan:
		return false
	}
}

func (link *MagnetLink) IsGotInfoFinished() bool {
	select {
	case <-link.torrent.GotInfo():
		return true
	default:
		return false
	}
}

func (link *MagnetLink) NewReader() io.Reader {
	link.reader = link.torrent.NewReader()
	return link.reader
}

func (link *MagnetLink) GetFileName() string {
	return link.torrent.Info().Name
}

func (link *MagnetLink) GetFileSize() int64 {
	return link.torrent.Info().Length
}

func (link *MagnetLink) GetTorrentStats() torrent.TorrentStats {
	return link.torrent.Stats()
}

func (link *MagnetLink) UploadToIPFS(ipfsShell *ipfs.Shell) (string, error) {
	file := files.NewReaderFile(link.NewReader())
	dir := files.NewSliceDirectory([]files.DirEntry{files.FileEntry("", file)})
	fileReader := files.NewMultiFileReader(dir, true)

	var out struct {
		Hash string
	}

	requestBuilder := ipfsShell.Request("add")
	return out.Hash, requestBuilder.Body(fileReader).Exec(link.ctx, &out)
}

func printProgress(link *MagnetLink, startFrom int64) {
	stats := link.GetTorrentStats()

	if !link.IsGotInfoFinished() {
		fmt.Printf("\r\033[Kpeers(active/all) %d/%d", stats.ConnectedSeeders, stats.TotalPeers)
		return
	}

	current := startFrom + stats.BytesReadUsefulData.Int64()
	total := link.GetFileSize()
	bar := strings.Repeat("#", int(math.Ceil(float64(50*current)/float64(total))))
	fmt.Printf("\r\033[K[%-50s] %d/%d, peers(active/all) %d/%d",
		bar, current, total,
		stats.ConnectedSeeders, stats.TotalPeers)
}

func main() {
	if len(os.Args) < 2 {
		fmt.Println("Usage: bt2ipfs magnetLink [ipfsIP:ipfsPort]")
		return
	}

	url := os.Args[1]
	ipfsUrl := "localhost:5001"
	if len(os.Args) > 2 {
		ipfsUrl = os.Args[2]
	}

	ipfsShell := ipfs.NewShell(ipfsUrl)
	client, _ := torrent.NewClient(nil)
	link := NewMagnetLink(client, url)

	// Handle Ctrl+C signal, exit program gracefully
	c := make(chan os.Signal)
	signal.Notify(c, syscall.SIGINT)
	go func() {
		<-c
		link.Close()
	}()

	fmt.Printf("Waiting info of %s\n", url)

	var startFrom int64

	// Print progress every second
	go func() {
		for {
			select {
			case <-link.GetCloseChan():
				// closed, return
				return
			case <-time.After(1 * time.Second):
				printProgress(link, startFrom)
			}
		}
	}()

	var ipfsHash string
	var err error

	// Wait for info
	if link.GotInfo() {
		startFrom = int64(link.GetTorrentStats().PiecesComplete) * link.torrent.Info().PieceLength
		fmt.Printf("\r\033[KFilename: %s\nSize: %d\n", link.GetFileName(), link.GetFileSize())

		// Transfer data from BT to IPFS
		ipfsHash, err = link.UploadToIPFS(ipfsShell)
		printProgress(link, startFrom)
	}

	fmt.Printf("\n")
	if err != nil {
		if !strings.Contains(err.Error(), "context canceled") {
			fmt.Printf("Transfer error. %v\n", err)
		}
	} else if ipfsHash != "" {
		fmt.Printf("IPFS hash: %s\n", ipfsHash)
	}

	link.Close()
	client.Close()
	client.WaitAll()
}
