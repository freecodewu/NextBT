import Pannel from "./Pannel";
import styled from "styled-components";

const Desc = styled.div`
  & > div {
    display: flex;
    justify-content: space-between;
    & > div {
      width: calc((100% - 48px) / 2);
      background: ${(props) => props.theme.$frountColor};
    }
  }
  .summary {
    .summary-item {
      display: flex;
      align-items: center;
      flex-direction: column;
      & > div {
        &:first-child {
          margin: 42px 0 20px;
          font-size: 18px;
          color: rgba(255, 255, 255, 0.6);
          line-height: 18px;
          font-weight: 500;
        }
        &:last-child {
          font-size: 24px;
          color: #ffffff;
          line-height: 24px;
          font-weight: 600;
          margin-bottom: 42px;
          img {
            width: 20px;
            margin-left: 12px;
          }
        }
      }
    }
  }
  .detail {
    margin-top: 42px;
    .detail-item {
      padding: 42px 40px;
      & > div {
        margin-bottom: 64px;
        &:last-child {
          margin: 0;
        }
        .type {
          font-size: 18px;
          color: rgba(255, 255, 255, 0.6);
          line-height: 18px;
          font-weight: 500;
          margin-bottom: 20px;
        }
        .size {
          font-size: 24px;
          line-height: 24px;
          font-weight: 600;
        }
      }
      &:first-child {
        .size {
          color: #02a4ff;
        }
      }
      &:last-child {
        .size {
          color: #01f1e3;
        }
      }
    }
  }
`;

const summarys = [
  {
    type: "BYTES DOWNLOADED",
    size: "9.57 MB",
  },
  {
    type: "BYTES UPLOADED",
    size: "9.57 MB",
  },
];

const details = [
  [
    {
      type: "Total Spending",
      size: "O BTT",
    },
    {
      type: "Total Download with Speed",
      size: "5.19 MB",
    },
    {
      type: "Spending Ratio",
      size: "O BTT/GB",
    },
  ],
  [
    {
      type: "Total Earning",
      size: "O BTT",
    },
    {
      type: "Total Seeded with Speed",
      size: "0.00 B",
    },
    {
      type: "Earning Ratio",
      size: "O BTT/GB",
    },
  ],
];
export default function Wallet() {
  return (
    <Pannel>
      <div className="pannel-title">
        <span>Wallet</span>
      </div>
      <Desc>
        <div className="summary">
          {summarys.map((i, index) => {
            return (
              <div className="summary-item" key={i.type}>
                <div>{i.type}</div>
                <div>
                  <span>{i.size}</span>
                  <img
                    src={require(`@imgs/operation/tab${index + 1}.png`)}
                    alt=""
                  />
                </div>
              </div>
            );
          })}
        </div>
        <div className="detail">
          {details.map((i, index) => {
            return (
              <div key={index} className="detail-item">
                {i.map((d) => {
                  return (
                    <div key={d.type}>
                      <div className="type">{d.type}</div>
                      <div className="size">{d.size}</div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </Desc>
    </Pannel>
  );
}
