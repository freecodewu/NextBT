import List from "./List";
import Pannel from "./Pannel";
import styled from "styled-components";
import { Dropdown, Menu, Upload as UploadAntd } from "antd";
const columns = [
  {
    title: "Name",
    dataIndex: "name",
    width: "50%",
  },
  {
    title: "Size",
    dataIndex: "size",
    width: "20%",
  },
  {
    title: "Download Status",
    dataIndex: "status",
    width: "20%",
  },
  {
    title: "",
    dataIndex: "ops",
    width: "10%",
  },
];
const dataSource = [
  {
    name: "Mr.Turner.2014.iNTERNAL.720p.BluRay (共3个文件))",
    size: "735.7MB",
    status: "2022/07/15 05:45 已完成",
  },
  {
    name: "Mr.Turner.2014.iNTERNAL.720p.BluRay (共222个文件))",
    size: "735.7MB",
    status: "2022/07/15 05:45 已完成",
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
        label: <Label type={"copy"} text="Copy CID"></Label>,
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

const Btn = styled(UploadAntd)`
  background: ${(props) => props.theme.$frountColor};
  width: 164px;
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
`;

export default function Upload() {
  return (
    <Pannel>
      <div className="pannel-title">
        <span>Files</span>
        <Btn>＋Upload</Btn>
      </div>
      <List
        columns={columns}
        dataSource={dataSource.map((item) => {
          return { ...item, ops: <Ops /> };
        })}
      />
    </Pannel>
  );
}
