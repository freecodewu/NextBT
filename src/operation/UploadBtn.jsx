import styled from "styled-components";
import { uploadFiles } from "@service";

const Btn = styled.div`
  background: ${(props) => props.theme.$frountColor};
  height: 64px;
  width: 164px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  position: relative;
  input {
    width: 100%;
    height: 100%;
    position: absolute;
    opacity: 0;
  }
`;

export default function UploadBtn() {
  function onChange(event) {
    uploadFiles(event.target.files, console.log);
    console.log(event.target.files);
  }
  return (
    <Btn>
      ＋Upload
      <input type="file" onChange={onChange} className="form-control" />
    </Btn>
  );
}
