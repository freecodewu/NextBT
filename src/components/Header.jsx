import Section from "./Section";
import styled from "styled-components";
import logo from "@imgs/logo.png";
import setting from "@imgs/setting.png";
import { useNavigate } from "react-router-dom";
const Wrapper = styled.div`
  height: 120px;
  display: flex;
  align-items: center;
`;

function Content() {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <img
        src={logo}
        style={{ height: "48px", cursor: "pointer" }}
        onClick={() => {
          navigate("/");
        }}
        alt=""
      />
      <img
        src={setting}
        alt=""
        style={{ height: "32px", marginLeft: "auto" }}
      />
    </Wrapper>
  );
}
export default function Header() {
  return (
    <Section>
      <Content />
    </Section>
  );
}

const ResWrapper = styled.div`
  background: ${(props) => props.theme.$bgColor};
  padding: 0 42px 0 48px;
`;

export function ResponsiveHeader() {
  return (
    <ResWrapper>
      <Content />
    </ResWrapper>
  );
}
