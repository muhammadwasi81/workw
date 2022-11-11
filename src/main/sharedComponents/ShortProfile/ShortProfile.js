import { Avatar } from "antd";
import React from "react";
import { getNameForImage } from "../../../utils/base";
import "./ShortProfile.css";

const SearchOptions = props => {
	const { name, jobTitle, userIcon } = props;

	return (
		<>
			<div className="user-tag flex items-center gap-2">
				<Avatar src={userIcon} className="!bg-black">
					{getNameForImage(name)}
				</Avatar>
				<div>
					<p>{name}</p>
					<p>{jobTitle}</p>
				</div>
			</div>

			{/* <div className="user-tag">
				{getNameForImage(name)}
				<img src={userIcon} alt="icon" />
			</div> */}
		</>
	);
};

export default SearchOptions;
