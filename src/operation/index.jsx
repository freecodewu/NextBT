import { ResponsiveHeader as Header } from "@/components/Header";
import styled from "styled-components";
import { useState } from "react";

import Download from "./Download";
import Upload from "./Upload";
import Wallet from "./Wallet";
import Dvpn from "./Dvpn";

const Main = styled.div`
  height: calc(100vh - 120px);
  display: flex;
  background: #050611;
  .side-bar {
    min-width: 284px;
    width: 20%;
    background: ${(props) => props.theme.$frountColor};
    padding: 48px 12px;
    .tab-item {
      margin-bottom: 8px;
      border-radius: 8px;
      padding: 22px 42px;
      font-size: 20px;
      line-height: 20px;
      font-weight: 500;
      color: #ffffff;
      cursor: pointer;
      img {
        width: 20px;
        height: auto;
        margin-right: 16px;
      }
    }
    .on {
      background: #252547;
    }
  }
`;

//const tabs = ["Download", "Upload", "Wallet", "DVPN"];
const tabs = ["Download", "Upload"];
const Coms = [
  <Download key="download" />,
  <Upload key="upload" />,
  <Wallet key="wallet" />,
  <Dvpn key="dvpn" />,
];
export default function Operation() {
  const [tabIndex, setIndex] = useState(0);

  return (
    <div>
      <Header />
      <Main>
        <div className="side-bar">
          {tabs.map((i, index) => {
            return (
              <div
                key={i}
                className={`tab-item ${index === tabIndex ? "on" : ""}`}
                onClick={() => {
                  setIndex(index);
                }}
              >
                <img
                  src={require(`@imgs/operation/tab${index + 1}.png`)}
                  alt=""
                />
                {i}
              </div>
            );
          })}
        </div>
        {Coms[tabIndex]}
      </Main>
    </div>
  );
}
