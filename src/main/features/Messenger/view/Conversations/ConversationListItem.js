import { Badge } from "antd";
import moment from "moment";
import React from "react";
import { useDispatch } from "react-redux";
import { STRINGS } from "../../../../../utils/base";
import Avatar from "../../../../sharedComponents/Avatar/avatarOLD";
import {
	handleIsopenChat,
	handleMessengerItemClick,
} from "../../store/messengerSlice";
import { MESSENGER_ENUMS } from "../../utils/Constant";

const ConversationListItem = ({ conversation }) => {
	const dispatch = useDispatch();

	// TODO: destructure & set default object of conversation data
	const {
		id = STRINGS.DEFAULTS.guid,
		imageId = "",
		name = "",
		image = "",
		chatType = MESSENGER_ENUMS.CHAT_TYPES.INDIVIDUAL_CHAT,
		chatWith = {
			name: "",
			image: "",
		},
		lastMessage = {
			message: "",
		},
		lastUpdate = "",
		messageCount = 0
	} = conversation;
	// TODO: Conditionally get profileImage & profileName behalf of ChatId
	const profileImage =
		chatType === MESSENGER_ENUMS.CHAT_TYPES.INDIVIDUAL_CHAT
			? chatWith?.image
			: image;
	const profileName =
		chatType === MESSENGER_ENUMS.CHAT_TYPES.INDIVIDUAL_CHAT
			? chatWith?.name
			: name;

	const handleItemClick = () => {
		// TODO: handleIsopenChat for manage Mobile Chat view;
		dispatch(handleIsopenChat(true));
		// TODO: handleMessengerItemClick for manage Global State of Messnger
		let chatMembers =
			chatType === MESSENGER_ENUMS.CHAT_TYPES.INDIVIDUAL_CHAT
				? [chatWith]
				: [];
		dispatch(
			handleMessengerItemClick({
				chatId: id,
				profileName: profileName,
				profileImage: profileImage,
				chatType: chatType,
				members: chatMembers,
				chatWith: chatWith
			})
		);
	};
	let lastMsgTime = moment.utc(lastUpdate).local().fromNow();
	return (
		<div className="ConversationListItem" onClick={handleItemClick}>
			<div className="ItemDP">
				<Badge count={messageCount} >
					<Avatar
						src={profileImage}
						name={profileName}
						size={38}
						round={true}
						status={chatWith?.userActiveStatus}
					/>
				</Badge>
			</div>
			<div className="ItemNameCont">
				<div className="ItemName">{profileName}</div>
				<div className="ItemLastMsgCont">
					<div className="ItemLastMsg">{lastMessage.message}</div>
					<div className="ItemLastMsgTime">{lastMsgTime}</div>
				</div>
			</div>
			{/* <div className="ItemIcon"> */}
			{/* <Badge count={1} /> */}
			{/* <Avatar src={"https://konnect.im/upload/2021/3/5325454b-1c5d-40f1-b95d-df0fad2d4da9.jpeg"} name={""} size={20} round={true} /> */}
			{/* </div> */}
		</div>
	);
};
export default ConversationListItem;
