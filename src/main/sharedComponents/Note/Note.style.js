import { Input } from "antd";
import styled from "styled-components";

const { TextArea } = Input;

export const NoteHead = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 2.5rem;
  background-color: #d9d9d970;
  color: var(--primary_theme_color_green);
  font-weight: 600;
  border-radius: 5px;
  padding: 0 10px;
  position: absolute;
  z-index: 10;
`;
export const Textarea = styled(TextArea)`
  height: 100% !important;
  width: 100%;
  resize: none;
  padding-top: 2.8rem;
  color: black;
  border-radius: 5px;
`;
