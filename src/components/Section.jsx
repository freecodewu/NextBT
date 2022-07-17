import styled from "styled-components";
const Wrapper = styled.div`
  background: ${(props) => props.theme.$bgColor};
  .container {
    width: ${(props) => props.theme.$desktopWidth};
    margin: 0 auto;
  }
`;

export default function Section({ children }) {
  return (
    <Wrapper>
      <div className="container">{children}</div>
    </Wrapper>
  );
}
