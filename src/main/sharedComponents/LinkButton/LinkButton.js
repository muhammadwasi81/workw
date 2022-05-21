import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
const CustomLink = styled(Link)`
  white-space: nowrap;
  height: 32px;
  padding: 4px 15px;
  font-size: 14px;
  border: 1px solid #d9d9d9;
  display: flex;
  gap: 5px;
  align-item: center;
  .anticon svg {
    height: -webkit-fill-available;
  }
`;

export default function LinkButton({ to, text, icon, ...rest }) {
  return (
    <CustomLink
      className="ThemeBtn tag_expense_btn font_bold p-0 "
      to={to}
      {...rest}
    >
      {icon}
      {text}
    </CustomLink>
  );
}
