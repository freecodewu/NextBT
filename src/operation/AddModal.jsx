import styled from "styled-components";
import { Input } from "antd";
import { downloadFiles } from "@service";
import { useState } from "react";
const { TextArea } = Input;
const Content = styled.div`
  color: #ffffff;
  .title {
    height: 67px;
    line-height: 67px;
    font-size: 20px;
    border-bottom: 1px solid rgba(37, 37, 71, 1);
    text-align: center;
  }
  .input {
    padding: 30px 42px;
    textarea {
      background-color: #0e0e20;
      border: 2px solid rgba(37, 37, 71, 1);
      border-radius: 8px;
      font-size: 20px;
      color: #fff;
      line-height: 20px;
      font-weight: 500;
      padding: 10px;
      &::-webkit-input-placeholder {
        /* WebKit browsers */
        color: rgba(255, 255, 255, 0.4);
      }
    }
  }
  .btn-group {
    display: flex;
    margin-top: 42px;
    .btn {
      cursor: pointer;
      width: 148px;
      height: 64px;
      background: #14142b;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      color: #ffffff;
      line-height: 18px;
      font-weight: 500;
      &.cancel {
        margin-left: auto;
        border: 1px solid rgba(255, 255, 255, 1);
        margin-right: 24px;
      }
      &.download {
        background-image: linear-gradient(102deg, #02a4ff 16%, #7d40ff 80%);
      }
    }
  }
`;

export default function AddModal({ hide, update }) {
  const [cid, setCid] = useState(undefined);
  function download() {
    console.log("start");
    const setProgress = update({});
    downloadFiles(cid, null, setProgress).then(() => {
      hide();
    });
  }

  return (
    <Content>
      <div className="title">Add CID</div>
      <div className="input">
        <TextArea
          value={cid}
          onChange={(e) => {
            setCid(e.target.value);
          }}
          rows={6}
          placeholder="Please input the CID"
        />
        <div className="btn-group">
          <div
            className="btn cancel"
            onClick={() => {
              hide();
            }}
          >
            Cancel
          </div>
          <div
            className="btn download"
            onClick={() => {
              download();
            }}
          >
            Download
          </div>
        </div>
      </div>
    </Content>
  );
}
