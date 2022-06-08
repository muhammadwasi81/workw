import styled from "styled-components";
import { Button } from "antd";
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
export const FilterButton = styled(Button)`
  display: flex;
  align-items: center;
  color: #757d86 !important;
  font-weight: 700;
  padding: 7px 20px;
  background: #ededed !important;
  border: 0;
  font-size: 14px;
  border-radius: 4px;
  font-size: 12px;
  &:hover {
    background: #1b5669 !important;
    color: #fff !important;
  }
`;
