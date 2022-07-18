# bt2ipfs

Utilities for transferring files from BT to IPFS.

## Build

```
go build bt2ipfs.go
```

## Usage

Transfer file from magnet link(magnet:?xt=urn:btih:KRWPCX3SJUM4IMM4YF5RPHL6ANPYTQPU) to IPFS(127.0.0.1:5001)

```
# ./bt2ipfs magnet:?xt=urn:btih:KRWPCX3SJUM4IMM4YF5RPHL6ANPYTQPU 127.0.0.1:5001
Waiting info of magnet:?xt=urn:btih:KRWPCX3SJUM4IMM4YF5RPHL6ANPYTQPU
Filename: ubuntu-14.04.2-desktop-amd64.iso
Size: 1044381696
[##################################################] 1044381696/1044381696
IPFS hash: QmaZnCNKzkkqMvNhsrw3zHhVTnUy6P1tK9dbPmLBBXLN7D
```
