import React from "react";
// import { useDispatch } from 'react-redux';
import Avatar from "../../../../../../sharedComponents/Avatar/avatarOLD";
import Attachments from "../../../../../travel/view/UI/Attachments";
import { getMessageStatus } from "../../../../utils/Functions";
import MessageProfile from "./messageProfile";

const MessengerListItem = ({
	messgeItem,
	messengerDetail = { chatType: 1 },
}) => {
	// const dispatch = useDispatch();
	const {
		id,
		message,
		messageType,
		attachments,
		messageByMe,
		status
	} = messgeItem;
	const { chatType } = messengerDetail;

	return (
		<div id={id} className={ !messageByMe ? "MessengerListItem" : "MessengerListItem-ME" } >
			<MessageProfile />
			<div className="MessageBubble">
				{/* {attachments.map(item => <img src={item.path} />)} */}
				{
					messageType === 'voice' &&
					<audio controls>
						<source src={attachments[0].path} />
						Your browser does not support the audio tag.
					</audio>
				}
				{!(messageType === 'voice') && <Attachments
					data={attachments}
					key={{ data: attachments }}
					toShow={3}
					onClick={() => {
						// dispatch(
						// 	handleAttachmentModal(
						// 		{data:attachments}
						// 	)
						// );
					}}
				/>}
				{message}
			</div>
			<div>
				{messageByMe && status}
			</div>
		</div>
	);
};
export default MessengerListItem;
