import React from "react";
import { Avatar, Tag } from "antd";
import PropTypes from "prop-types";
import { UserOutlined } from "@ant-design/icons";

function TagAvatar(props) {
	return (
		<div>
			<Tag className="reference_tag !flex !items-center !gap-1">
				<Avatar
					size={"small"}
					style={{
						backgroundColor: "#87d068",
					}}
					icon={<UserOutlined />}
				/>
				Danish
			</Tag>
		</div>
	);
}

export default TagAvatar;
