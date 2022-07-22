import React from "react";
import { Avatar, Tooltip } from "antd";
import { getNameForImage } from "../../../utils/base";
// import { AntDesignOutlined, UserOutlined } from "@ant-design/icons";
// import PropTypes from "prop-types";

function AvatarGroup(props) {
	return (
		<div>
			<Avatar.Group
				maxCount={2}
				maxPopoverTrigger="click"
				size=""
				maxStyle={{
					color: "#f56a00",
					backgroundColor: "#fde3cf",
					cursor: "pointer",
				}}
			>
				{props.membersData.map(members => (
					<Tooltip
						title={
							members[props.nestedObjProperty] !== null
								? members[props.nestedObjProperty].name
								: "Unknown User"
						}
						placement="top"
					>
						<Avatar
							className="bg-neutral-100 cursor-pointer"
							src={
								members[props.nestedObjProperty] !== null &&
								members[props.nestedObjProperty].image
									? members[props.nestedObjProperty].image
									: props.dummyImage
							}
						>
							{getNameForImage(
								members[props.nestedObjProperty] !== null
									? members[props.nestedObjProperty].name
									: "Unknown User"
							)}
						</Avatar>
					</Tooltip>
				))}
				{/* <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
				<Avatar
					style={{
						backgroundColor: "#f56a00",
					}}
				>
					K
				</Avatar>
				<Tooltip title="Ant User" placement="top">
					<Avatar
						style={{
							backgroundColor: "#87d068",
						}}
						icon={<UserOutlined />}
					/>
				</Tooltip>
				<Avatar
					style={{
						backgroundColor: "#1890ff",
					}}
					icon={<AntDesignOutlined />}
				/> */}
			</Avatar.Group>
		</div>
	);
}

export default AvatarGroup;
