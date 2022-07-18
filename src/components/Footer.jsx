import Section from "./Section";
import styled from "styled-components";
const Wrapper = styled.div`
  height: 144px;
  display: flex;
  align-items: center;
  font-size: 16px;
  color: #abafc7;
  font-weight: 500;
  border-top: 2px solid rgba(20, 20, 43, 1);
  .contact {
    margin-left: auto;
    img {
      width: 40px;
      margin-left: 10px;
    }
  }
`;
export default function Footer() {
  return (
    <Section>
      <Wrapper>
        <span>© 2022 Creative NextBT</span>
        <div className="contact">
          {new Array(4).fill("").map((i, index) => {
            return (
              <img
                key={index}
                src={require(`@imgs/contact${index + 1}.png`)}
                alt=""
              />
            );
          })}
        </div>
      </Wrapper>
    </Section>
  );
}
