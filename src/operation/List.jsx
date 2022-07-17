import styled from "styled-components";
import selected from "@imgs/operation/selected.png";
import unSelected from "@imgs/operation/unSelected.png";
import { useState } from "react";
const Wrapper = styled.div`
  background: ${(props) => props.theme.$frountColor};
  border-radius: 8px;
  flex: 1;
  padding: 24px 42px;
  & > div {
    border-bottom: 2px solid rgba(37, 37, 71, 1);
    display: flex;
    & > div {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      padding: 0 10px;
    }
  }
  .title {
    margin-top: 28px;
    font-size: 16px;
    color: #ffffff;
    line-height: 16px;
    font-weight: 500;
    padding-bottom: 18px;
  }
  .item {
    font-size: 18px;
    height: 70px;
    display: flex;
    align-items: center;
    color: #fff;
    .size,
    .status {
      opacity: 0.6;
    }
  }
`;

export default function List({ columns, dataSource }) {
  return (
    <Wrapper>
      <div className="title">
        <Checkbox></Checkbox>
        {columns.map((i) => {
          return (
            <div key={i.dataIndex} style={{ width: i.width }}>
              {i.title}
            </div>
          );
        })}
      </div>
      {dataSource.map((data) => {
        return (
          <div className="item" key={data.name}>
            <Checkbox></Checkbox>
            {columns.map((column) => {
              return (
                <div
                  key={column.dataIndex}
                  title={
                    typeof data[column["dataIndex"]] === "string"
                      ? data[column["dataIndex"]]
                      : ""
                  }
                  style={{ width: column.width }}
                  className={column.dataIndex}
                >
                  {column["dataIndex"] === "name" && (
                    <img
                      style={{
                        width: "32px",
                        height: "32px",
                        marginRight: "12px",
                      }}
                      src={require(`@imgs/operation/bt.png`)}
                    ></img>
                  )}
                  {data[column["dataIndex"]]}
                </div>
              );
            })}
          </div>
        );
      })}
    </Wrapper>
  );
}

const CheckboxWrap = styled.div`
  width: 20px;
  height: 20px;
  background: url(${(props) => props.img});
  background-size: contain;
  margin-right: 6px;
  cursor: pointer;
`;

function Checkbox() {
  const [isSelected, setSelect] = useState(false);
  return (
    <CheckboxWrap
      img={isSelected ? selected : unSelected}
      onClick={() => {
        setSelect((c) => !c);
      }}
    ></CheckboxWrap>
  );
}
