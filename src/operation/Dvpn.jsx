import Pannel from "./Pannel";
import styled from "styled-components";

const List = styled.div`
  background: ${(props) => props.theme.$frountColor};
  padding: 20px 40px;
  color: #fff;
  & > div {
    display: flex;
    border-bottom: 2px solid rgba(37, 37, 71, 1);
    & > div:last-child {
      margin-left: auto;
    }
  }
  .title {
    font-size: 16px;
    padding-bottom: 17px;
    img {
      width: 6px;
      margin-left: 12px;
    }
  }
  .item {
    height: 71px;
    line-height: 71px;
    font-size: 24px;
    line-height: 24px;
    font-weight: 600;
    display: flex;
    justify-content: center;
    align-items: center;
    .selected {
      width: 20px;
      margin-right: 16px;
      visibility: hidden;
    }
    .flag {
      width: 32px;
      margin-right: 12px;
      height: auto;
    }
    &.item0 {
      .selected {
        visibility: visible;
      }
    }
  }
`;

const list = [
  { country: "Singapore", latency: "83ms" },
  { country: "Australia", latency: "89ms" },
  { country: "Singapore", latency: "99ms" },
  { country: "Unknown", latency: "110ms" },
  { country: "USA", latency: "110ms" },
];
export default function Dvpn() {
  return (
    <Pannel>
      <div className="pannel-title">
        <span>DVPN</span>
      </div>
      <List>
        <div className="title">
          <div>LOCATION</div>
          <div>
            LATENCY <img src={require("@imgs/operation/arrow.png")} alt="" />
          </div>
        </div>
        {list.map((i, index) => {
          return (
            <div key={index} className={`item item${index}`}>
              <img
                className="selected"
                src={require(`@imgs/operation/selected.png`)}
                alt=""
              />
              <img
                className="flag"
                src={require(`@imgs/operation/${i.country}.png`)}
                alt=""
              />
              {i.country}
              <div>{i.latency}</div>
            </div>
          );
        })}
      </List>
    </Pannel>
  );
}
