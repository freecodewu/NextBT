import styled from "styled-components";
import { Upload as UploadAntd } from "antd";
import { useState } from "react";
import { uploadFiles } from "@service";

const Btn = styled(UploadAntd)`
  background: ${(props) => props.theme.$frountColor};
  height: 64px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  .ant-upload {
    color: #ffffff;
    font-size: 24px;
    line-height: 24px;
    font-weight: 500;
  }
  span {
    color: #ffffff;
  }
`;

export default function UploadBtn() {
  const [fileList, setFileList] = useState([]);
  // const handleUpload = () => {
  //   const formData = new FormData();
  //   fileList.forEach((file) => {
  //     formData.append("files[]", file);
  //   });
  //   // You can use any AJAX library you like
  //   // fetch("https://www.mocky.io/v2/5cc8019d300000980a055e76", {
  //   //   method: "POST",
  //   //   body: formData,
  //   // })
  //   //   .then((res) => res.json())
  //   //   .then(() => {
  //   //     setFileList([]);
  //   //     message.success("upload successfully.");
  //   //   })
  //   //   .catch(() => {
  //   //     message.error("upload failed.");
  //   //   })
  //   //   .finally(() => {
  //   //     setUploading(false);
  //   //   });
  // };
  function onChange(event) {
    uploadFiles(event.target.files, console.log);
    console.log(event.target.files);
  }
  // return <Btn {...props}>＋Upload</Btn>;
  return <input type="file" onChange={onChange} className="form-control" />;
}
