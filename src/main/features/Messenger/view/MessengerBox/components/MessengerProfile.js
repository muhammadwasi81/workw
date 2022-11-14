import React from "react";
import Avatar from "../../../../../sharedComponents/Avatar/avatarOLD";
import phoneIcon from "../../../../../../content/NewContent/Messenger/phone.svg";
import videoIcon from "../../../../../../content/NewContent/Messenger/video.svg";
// import infoIcon from "../../../../../../content/NewContent/Messenger/info.svg";

const MessengerProfile = ({ hanldeClose, messengerDetail }) => {
	const { profileName, profileImage, chatId, chatType, chatWith } = messengerDetail;
	console.log(messengerDetail, "messengerDetail")
	return (
		<div className="MessengerProfile" onClick={hanldeClose}>
			<div className="imgHolder">
				{/* <img
					className="profileImg"
					src={profileImage}
				/> */}
				<div className="text-center">
					<Avatar
						src={profileImage}
						name={""}
						size={60}
						round={true}
					/>
				</div>
				<div>
					<div className="user">
						<div className="name">{profileName}</div>
						<div className="desc">{chatWith.designation}</div>
					</div>
					<div className="actions">
						<div>
							<img src={phoneIcon} className="actionImg1" />
						</div>
						<div>
							<img src={videoIcon} className="actionImg2" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default MessengerProfile;
