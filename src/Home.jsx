import Header from "./components/Header";
import Footer from "./components/Footer";
import Section from "./components/Section";
import styled from "styled-components";
//import global from "@imgs/global.png";
import { useNavigate } from "react-router-dom";
const Main = styled.div`
  padding: 124px 0 82px;
  text-align: center;
  color: #ffffff;
  .title {
    font-size: 72px;
    line-height: 72px;
    font-weight: 700;
  }
  & > .desc {
    font-size: 24px;
    color: #ffffff;
    font-weight: 400px;
    margin-top: 32px;
  }
  .start {
    cursor: pointer;
    background-image: linear-gradient(102deg, #02a4ff 16%, #7d40ff 80%);
    border-radius: 12px;
    width: 200px;
    height: 64px;
    font-size: 16px;
    font-weight: 700px;
    margin: 48px auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 35px;
  }
  .reason-title {
    font-size: 54px;
    line-height: 54px;
    font-weight: 700;
    margin-top: 24px;
    span {
      background: -webkit-linear-gradient(278deg, #02a4ff 16%, #7d40ff 80%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
  .reason-list {
    margin-top: 84px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .reason-item {
      background: #14142b;
      border-radius: 20px;
      width: 564px;
      padding: 59px 42px;
      display: flex;
      align-items: center;
      margin-bottom: 42px;
      img {
        width: 84px;
        margin-right: 32px;
      }
      .title {
        font-size: 24px;
        line-height: 24px;
        font-weight: 700;
        margin-bottom: 12px;
        text-align: left;
      }
      .desc {
        font-size: 20px;
        line-height: 30px;
        font-weight: 500;
        text-align: left;
      }
    }
  }
  .threed-material {
    font-size: 20px;
  }
`;
/* const reasons = [
  {
    title: "Security",
    desc: "Protect your privacy through decentralized VNP",
  },
  {
    title: "Earn",
    desc: "Mining as you surf the web, get income for sharing your extra bandwidth.",
  },
  {
    title: "Transparent",
    desc: "You know the details of product implementation through open source",
  },
  {
    title: "No Evil",
    desc: "Don't abuse your bandwidth",
  },
]; */

export default function Home() {
  const navigate = useNavigate();
  return (
    <div>
      <Header></Header>
      <Section>
        <Main>
          {/* <div className="title">NextBT Network</div>
          <div className="desc">
            Building the decentralized VPN to realize secure BT download. Built
            on the IPFS/Filecoin with Web3.0 way
          </div>
          <div
            className="start"
            onClick={() => {
              navigate("/operation");
            }}
          >
            Get Started{" "}
            <img
              src={require("@imgs/arrow.png")}
              style={{ height: "16px" }}
              alt=""
            />
          </div>
          <img src={global} alt="" style={{ width: "100%" }} />
          <div className="reason-title">
            Why Choose <span> NextBT Network</span>
          </div>
          <div className="reason-list">
            {reasons.map((i, index) => {
              return (
                <div key={i.title} className="reason-item">
                  <img src={require(`@imgs/reason${index + 1}.png`)} alt="" />
                  <div>
                    <div className="title">{i.title}</div>
                    <div className="desc">{i.desc}</div>
                  </div>
                </div>
              );
            })}
          </div> */}
          <div
            className="home-get-started"
            onClick={() => {
              navigate("/operation");
            }}
          >
            <img
              src={require("@imgs/homegetstarted.png")}
              alt=""
              style={{ width: "100%" }}
            />
          </div>
          <div
            className="threed-material"
            onClick={() => {
              navigate("/operation?fid=123");
            }}
          >
            <img
              src={require("@imgs/threedmaterial.png")}
              alt=""
              style={{ width: "100%" }}
            />
          </div>
          <div
            className="video-lesson"
            onClick={() => {
              navigate("/operation?fid=123");
            }}
          >
            <img
              src={require("@imgs/videolessson.png")}
              alt=""
              style={{ width: "100%" }}
            />
          </div>
        </Main>
      </Section>
      <Footer />
    </div>
  );
}
