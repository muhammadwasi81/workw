import React from "react";
import { Tag } from "antd";
import PropTypes from "prop-types";
import { UserOutlined } from "@ant-design/icons";
import Avatar from "./avatarOLD";

function TagAvatar(props) {
  return (
    <div>
      <Tag className="reference_tag !flex !items-center !gap-1">
        <Avatar
          src={props.img}
          name={props.text}
          round={true}
          size={16} />
        {props.text}
      </Tag>
    </div>
  );
}

export default TagAvatar;
