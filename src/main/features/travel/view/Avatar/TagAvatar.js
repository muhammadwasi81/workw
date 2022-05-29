import React from "react";
import { Avatar, Tag } from "antd";
import PropTypes from "prop-types";
import { UserOutlined } from "@ant-design/icons";

function TagAvatar(props) {
	return (
		<div>
			<Tag className="!text-primary-color !border-none !py-1 !px-2 !bg-primary-ref-tag !rounded !text-sm !font-bold !flex !items-center !gap-1 !w-fit">
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
