import { Avatar, Tooltip } from "antd";
import React from "react";
import { getNameForImage } from "../../../utils/base";

function MultipleAvatars({
	maxCount = 2,
	data,
	onClickAvatar,
	size = "default",
}) {
	return (
		<Avatar.Group
			maxCount={maxCount}
			maxPopoverTrigger="hover"
			size={size}
			maxStyle={{
				backgroundColor: "var(--currentThemeColor)",
				cursor: "pointer",
			}}
		>
			{data.map(members => (
				<Tooltip
					title={
						members.name
							? members.name
							: members
							? members
							: "Unknown User"
					}
					placement="top"
				>
					<Avatar
						className=" cursor-pointer"
						src={members.image ? members.image : ""}
					>
						{getNameForImage(
							members.name
								? members.name
								: members
								? members
								: "Unknown User"
						)}
					</Avatar>
				</Tooltip>
			))}
		</Avatar.Group>
	);
}

export default MultipleAvatars;
