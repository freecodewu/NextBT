import { Web3Storage } from "web3.storage/dist/bundle.esm.min.js";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import FileTransfer from '../../artifacts/contracts/FileTransfer.sol/FileTransfer.json'
import { BigNumber, ethers } from "ethers";

const contractAddress = "0xbbFc36C9110e072FB6eC268f37adD5f8d98eF3cF";

// 初始化web.storage客户端
const REACT_APP_WEB3STORAGE_API_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDcwREVmQWNDQThFMjQzNzc5NzFGMzYzNmRkRDk4MTBjRTg2RTE0MmQiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NTc3MDM4NjQ3MDgsIm5hbWUiOiJkZW1vIn0.gr5ITCiXYSxZYz1LKOe6yDlqdODTJPyEY64afvaTFsM";
const client = new Web3Storage({ token: REACT_APP_WEB3STORAGE_API_TOKEN });

// 下载
// uploadFiles(files, setSendProgress);

// 获取上传的cid列表
// console.log(await listUploads())

// 获取cid对应的文件列表
// console.log(await getLinks("bafybeih5o5j3dbti5q5mbkiprkd2qvqtowazfhnv4cube6h4iqbd4szgyq"));

// 上传
// console.log(await downloadFiles("bafybeig23uwq3may6wvznegyxa6pdhwmtcqep654m7o7u5hlcbwnj4pepe", "", setSendProgress));

// 获取已上传列表
export const listUploads = async function () {
  let uploads = new Array();
  for await (const upload of client.list()) {
    console.log(
      `upload ${upload.name} - cid: ${upload.cid} - size: ${upload.dagSize}`
    );
    uploads.push({
      name: upload.name,
      cid: upload.cid,
      size: upload.dagSize,
    });
  }
  return uploads;
};

// 文件上传
export const uploadFiles = async function (files, setProgress) {
  let size = 0;
  let rootCid = "";
  for (let i = 0; i < files.length; i++) {
    size += files[i].size;
  }
  let sendSize = 0;
  const onStoredChunk = (chunkSize) => {
    sendSize += chunkSize;
    let progress =
      (sendSize / size) * 100 > 100 ? 100 : (sendSize / size) * 100;
    console.log(`stored chunk of ${chunkSize} bytes, %${progress}`);
    setProgress({
      progress,
      cid: rootCid,
    });
  };

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send('eth_requestAccounts', []); // <- this promps user to connect metamask
  const signer = provider.getSigner();
  const contract = new ethers.Contract(contractAddress, FileTransfer.abi, signer);

  const options = {value: ethers.utils.parseEther("0.001")};

  try {
    rootCid = await client.put(files, { onStoredChunk });
    setProgress({
      progress: 100,
      cid: rootCid,
    });

    console.log("begin start uploadFile");
    let tx = await contract.uploadFile(rootCid, options);
    let rc = await tx.wait();
    console.log("after start uploadFile", rc);

    let BigNumberFileIdHex = rc.events[0].args["fileId"]._hex;
    let fileId = BigNumber.from(BigNumberFileIdHex).toNumber();
    console.log("fileId: ",fileId);

    console.log("Successfully sent to IPFS, FID: ", fileId);
    console.log("https://" + rootCid + ".ipfs.dweb.link");
  } catch (err) {
    console.log("Failed to send to IPFS", err);
  }

  return rootCid;
};

// 文件下载
export const downloadFiles = async function (fid, filePath, setProgress) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send('eth_requestAccounts', []); // <- this promps user to connect metamask
  const signer = provider.getSigner();
  const contract = new ethers.Contract(contractAddress, FileTransfer.abi, signer);

  const options = {value: ethers.utils.parseEther("0.01")};
  let cid;
  try {
    console.log("开始合约支付");
    let tx = await contract.downloadFile(fid, options);
    let rc = await tx.wait();
    // console.log("after start downloadFile", rc);

    cid = rc.events[0].args["cid"];
    console.log("支付完成，cid: ",cid);
  } catch (err) {
    console.log("Failed to get cid by fid from contract", err);
  }

  const links = await getLinks(cid);
  setProgress({
    progress: 0,
    cid,
    name: links[0].Name,
    size: 0,
  });
  let progressMap = new Map();

  const getFileBlob = function (url, name) {
    return new Promise((resolve, reject) => {
      let request = new XMLHttpRequest();
      request.open("GET", url, true);
      request.responseType = "blob";
      request.addEventListener("progress", (event) => {
        if (event.lengthComputable) {
          let percentComplete = (event.loaded / event.total) * 100;
          console.log("文件下载百分比", percentComplete, url);
          progressMap.set(url, [event.loaded, event.total]);
        }
        let loaded = 0;
        let total = 0;
        progressMap.forEach(function (item, key, mapObj) {
          total += item[1];
          loaded += item[0];
        });

        let progress =
          (loaded * 100) / total > 100 ? 100 : (loaded * 100) / total;
        setProgress({
          progress,
          cid,
          name,
          size: total,
        });
      });
      request.onload = (res) => {
        if (res.target.status == 200) {
          resolve(res.target.response);
        } else {
          reject(res);
        }
      };
      request.send();
    });
  };

  const zip = new JSZip();
  const promises = [];
  links.forEach((link) => {
    let url = `https://${cid}.ipfs.dweb.link/${link.Name}`;
    const promise = getFileBlob(url, link.Name).then((res) => {
      zip.file(link.Name, res, { binary: true });
    });
    promises.push(promise);
  });
  Promise.all(promises).then(() => {
    zip.generateAsync({ type: "blob" }).then((res) => {
      saveAs(res, cid + ".zip");
    });
  });
  return 0;
};

export const getLinks = async function (cid) {
  const url = "https://ipfs.io/api/v0/ls?arg=" + cid;

  let res = await fetch(url);
  if (!res.ok) {
    throw new Error(
      `failed to get links by ${cid} - [${res.status}] ${res.statusText}`
    );
  }
  const json = await res.json();
  return json.Objects[0].Links;
};
