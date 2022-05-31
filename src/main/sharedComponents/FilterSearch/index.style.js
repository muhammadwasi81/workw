import styled from "styled-components";

export const DatePickerWithlabel = styled.div`
  position: relative;
  & > span {
    position: absolute;
    top: 20px;
    z-index: 999;
    background: #fff;
    left: 17px;
  }
`;
