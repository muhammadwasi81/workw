import React from "react";
import Avatar from "../Avatar/avatarOLD";

const UserInfo = props => {
	const { name, avatarSrc, Subline } = props;
	return (
		<div className="userInfo" style={{ display: "flex" }}>
			<Avatar
				src={avatarSrc}
				className="addPostAvatar"
				name={name}
				width={44}
				height={44}
				round={true}
			/>
			<div className="avatar-name" style={{ marginLeft: "6px" }}>
				<div className="name">{name}</div>
				{Subline}
			</div>
		</div>
	);
};
export default UserInfo;
