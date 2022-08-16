import List from "./List";
import Pannel from "./Pannel";
import styled from "styled-components";
import { Dropdown, Menu } from "antd";
import UploadBtn from "./UploadBtn";
import { useGetList } from "@/store";

const Name = styled.div`
  display: inline-flex;
  flex-direction: column;
  color: #fff;
  .cid {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.6);
    line-height: 12px;
    font-weight: 500;
    margin-top: 8px;
  }
`;
const columns = [
  {
    title: "Name",
    dataIndex: "name",
    width: "50%",
    render: (name, record) => {
      return (
        <Name>
          <div> {record.name}</div>
          {record.cid && <div className="cid">{record.cid}</div>}
        </Name>
      );
    },
  },
  {
    title: "Size",
    dataIndex: "size",
    width: "20%",
  },
  {
    title: "Upload Status",
    dataIndex: "status",
    width: "20%",
  },
  {
    title: "",
    dataIndex: "ops",
    width: "10%",
  },
];

const OpsWrapper = styled.div`
  display: flex;
  cursor: pointer;
  height: 20px;
  align-items: center;
  span {
    display: inline-block;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: #fff;
    opacity: 1;
    margin-right: 2px;
  }
`;
function Label({ type, text }) {
  return (
    <div
      style={{
        color: "#fff",
        padding: "5px",
        fontSize: "18px",
        fontWeight: "500",
      }}
    >
      <img
        style={{ width: "18px", marginRight: "8px" }}
        src={require(`@imgs/operation/${type}.png`)}
      />
      {text}
    </div>
  );
}

const menu = (
  <Menu
    items={[
      {
        key: "1",
        label: <Label type={"share"} text="Share link"></Label>,
      },
      {
        key: "2",
        label: <Label type={"copy"} text="Copy FID"></Label>,
      },
    ]}
  />
);

function Ops() {
  return (
    <Dropdown overlay={menu} placement="bottom">
      <OpsWrapper>
        <span></span>
        <span></span>
        <span></span>
      </OpsWrapper>
    </Dropdown>
  );
}

export default function Upload() {
  const list = useGetList("upload");

  return (
    <Pannel>
      <div className="pannel-title">
        <span>Files</span>
        <UploadBtn />
      </div>
      <List
        columns={columns}
        dataSource={list.map((item) => {
          return { ...item, ops: <Ops /> };
        })}
      />
    </Pannel>
  );
}
