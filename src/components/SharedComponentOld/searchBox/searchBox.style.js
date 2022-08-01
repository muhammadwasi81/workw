import styled from "styled-components";
import { Input } from "../SharedComponentBridge/index";

export const SearchBoxStyle = styled(Input)`
  color: #757d86;
  font-weight: bold;
  border-radius: 8px;
  margin: 0 10px;
  border: none;

  &.ant-input-affix-wrapper > input.ant-input {
    background: ${(props) => props.style && props.style.backgroundColor};
    padding: ${(props) =>
      (props.style.padding && props.style.padding) || "4px 9px"};
  }
`;
