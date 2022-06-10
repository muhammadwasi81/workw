import React from "react";
import { useSelector } from "react-redux";
import Avatar from "../../sharedComponents/Avatar/avatarOLD";

export const SideBarListItem = props => {
	const sideBarStatus = useSelector(
		state => state.sideBarChatSlice.sideBarChatStatus
	);
	const sideBarChatIsDefault = useSelector(
		state => state.sideBarChatSlice.sideBarChatIsDefault
	);
	let { imgSrc } = props;
	return (
		<div className="sideBarListItem">
			<div className="sideBarListAvatar">
				<Avatar
					src={imgSrc}
					name={""}
					size={40}
					round={true}
					counter={1}
				/>
			</div>
			<div
				className={`sideBarListName ${
					sideBarChatIsDefault
						? "hideMe"
						: !sideBarStatus
						? "hideSideBarItem"
						: "unHideSideBarItem"
				}`}
			>
				Abu Bakar Memon
			</div>
		</div>
	);
};

export default SideBarListItem;
