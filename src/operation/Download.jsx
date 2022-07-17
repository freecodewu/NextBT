import List from "./List";
import Pannel from "./Pannel";
import { Dropdown, Menu, Modal } from "antd";
import { useMemo, useState } from "react";
import AddModal from "./AddModal";
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
    width: "30%",
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
function Label({ text, onClick }) {
  return (
    <div
      style={{
        color: "#fff",
        padding: "5px",
        fontSize: "18px",
        fontWeight: "500",
      }}
      onClick={() => {
        if (onClick) {
          onClick();
        }
      }}
    >
      {text}
    </div>
  );
}

export default function Download() {
  const [visible, setVisible] = useState(false);
  const menu = useMemo(() => (
    <Menu
      items={[
        {
          key: "1",
          label: <Label text="Add BT"></Label>,
        },
        {
          key: "2",
          label: (
            <Label onClick={() => setVisible(true)} text="Add CID"></Label>
          ),
        },
      ]}
    />
  ));
  return (
    <Pannel>
      <div className="pannel-title">
        <span>Files</span>
        <Dropdown overlay={menu} placement="bottom">
          <img
            style={{
              marginLeft: "auto",
              height: "48px",
              width: "auto",
              cursor: "pointer",
            }}
            src={require(`@imgs/operation/add.png`)}
            alt=""
          />
        </Dropdown>
      </div>
      <List columns={columns} dataSource={dataSource} />
      <Modal
        bodyStyle={{
          backgroundColor: "#14142B",
          padding: "0px",
        }}
        footer={null}
        visible={visible}
        closable={false}
      >
        <AddModal
          hide={() => {
            setVisible(false);
          }}
        />
      </Modal>
    </Pannel>
  );
}
