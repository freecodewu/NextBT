import List from "./List";
import Pannel from "./Pannel";
import { Dropdown, Menu, Modal } from "antd";
import { useMemo, useState } from "react";
import AddModal from "./AddModal";
import { useGetList, useUpdateList } from "@/store";
import { useSearchParams } from "react-router-dom";

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
  const list = useGetList("download");
  const update = useUpdateList("download");

  const [search] = useSearchParams();
  const fid = search.get("fid");
  if (fid !== "undefined" && fid !== null) {
    console.log(fid);
  }

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
            <Label onClick={() => setVisible(true)} text="Add FID"></Label>
          ),
        },
      ]}
    />
  ));
  return (
    <Pannel>
      <div className="pannel-title">
        <span
          onClick={() => {
            update();
          }}
        >
          Files
        </span>
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
            hidden="hidden"
          />
        </Dropdown>
      </div>
      <List columns={columns} dataSource={list} />
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
          update={update}
          hide={() => {
            setVisible(false);
          }}
        />
      </Modal>
    </Pannel>
  );
}
