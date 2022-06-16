import { Button } from "antd";
import React from "react";
import Avatar from "../../../Avatar/avatarOLD";
import { Tag } from "antd";
function Header({ username, userdesignation, status }) {
  return (
    <div className="approval-header">
      <div className="header-left">
        <Avatar size={40} round width={"30px"} height={"30px"} />
        <div className="user-details">
          <span className="user-name">{username}</span>
          <span className="designation">{userdesignation}</span>
        </div>
      </div>
      <div className="header-right">
        <Tag>{status}</Tag>
      </div>
    </div>
  );
}

export default Header;
