import { Badge } from "antd";
import moment from "moment";
import React from "react";
import { useDispatch } from "react-redux";
import { STRINGS } from "../../../../../utils/base";
import Avatar from "../../../../sharedComponents/Avatar/avatar";
import { handleIsopenChat, handleMessengerItemClick } from "../../store/messengerSlice";
import { MESSENGER_ENUMS } from "../../utils/Constant";

const ConversationListItem = ({ conversation }) => {
	const dispatch = useDispatch();
	
	// TODO: destructure & set default object of conversation data
	const {
		id = STRINGS.DEFAULTS.guid,
		imageId = "",
		name = "",
		chatType = MESSENGER_ENUMS.CHAT_TYPES.INDIVIDUAL_CHAT,
		chatWith = {
			name: "",
			image: ""
		},
		lastMessage = {
			lastMessage:""
		},
		lastUpdate = ""
	} = conversation;
	// TODO: Conditionally get profileImage & profileName behalf of ChatId
	const profileImage = chatType === MESSENGER_ENUMS.CHAT_TYPES.INDIVIDUAL_CHAT ? chatWith.image :
		chatType === MESSENGER_ENUMS.CHAT_TYPES.GROUP_CHAT ? imageId : "";
	const profileName = chatType === MESSENGER_ENUMS.CHAT_TYPES.INDIVIDUAL_CHAT ? chatWith.name :
		chatType === MESSENGER_ENUMS.CHAT_TYPES.GROUP_CHAT ? name : ""
	
		const handleItemClick = () => {
		// TODO: handleIsopenChat for manage Mobile Chat view;
		dispatch(handleIsopenChat(true))
		// TODO: handleMessengerItemClick for manage Global State of Messnger
		let chatMembers =  chatType === MESSENGER_ENUMS.CHAT_TYPES.INDIVIDUAL_CHAT ? [chatWith] : []
		dispatch(handleMessengerItemClick({
			chatId: id,
			profileName: profileName,
			profileImage: profileImage,
			chatType: chatType,
			members: chatMembers
		}))
	}
	let lastMsgTime = !moment(new Date()).isAfter(lastUpdate) ? moment(lastUpdate).format('LT') : moment(lastUpdate).format('LL')

	return (
		<div
			className="ConversationListItem"
			onClick={handleItemClick}
		>
			<div className="ItemDP">
				<Avatar
					src={profileImage}
					name={profileName}
					size={38}
					round={true}
				/>
			</div>
			<div className="ItemNameCont">
				<div className="ItemName">{profileName}</div>
				<div className="ItemLastMsgCont">
					<div className="ItemLastMsg">
						{lastMessage.lastMessage}
					</div>
					<div className="ItemLastMsgTime">{ lastMsgTime }</div>
				</div>
			</div>
			<div className="ItemIcon">
				<Badge count={1} />
				{/* <Avatar src={"https://konnect.im/upload/2021/3/5325454b-1c5d-40f1-b95d-df0fad2d4da9.jpeg"} name={""} size={20} round={true} /> */}
			</div>
		</div>
	);
};
export default ConversationListItem;
