import React from "react";
import { useSelector } from "react-redux";
// import { useDispatch } from 'react-redux';
import Avatar from "../../../../../../sharedComponents/Avatar/avatarOLD";
import Attachments from "../../../../../travel/view/UI/Attachments";
import { getMessageByMe, getMessageStatus } from "../../../../utils/Functions";
import MessageProfile from "./messageProfile";
import MessageStatusView, { getIconByStatus } from "./messageStatusView";
import AudioComponent from "./audioComponent";

const MessengerListItem = ({
  messgeItem,
  messengerDetail = { chatType: 1 },
  isChatBox = false,
  previousMessage
}) => {
  const {
    id,
    message,
    messageType,
    attachments,
    // messageByMe,
    status,
    createBy,
    creator,
  } = messgeItem;
  const { user } = useSelector((state) => state.userSlice);
  const messageByMe = getMessageByMe(createBy, user);
  const { chatType } = messengerDetail;
  const isGroupMessage = previousMessage?.creator?.id === creator?.id;
  let contClasses = !messageByMe ? "MessengerListItem" : "MessengerListItem-ME";
  contClasses = 

  console.log(previousMessage, "previousMessage");
  console.log(id, "id");
  
  return (
    <div
      id={id}
      className={!messageByMe ? "MessengerListItem" : "MessengerListItem-ME"}
    >
      <MessageProfile
        isChatBox={isChatBox}
        messageByMe={messageByMe}
        creator={creator}
        isGroupMessage={isGroupMessage}
      />
      <div className="MessageBubble">
        {messageType === 2 && (
          <AudioComponent
            audio={attachments[0].path}
            creator={creator}
            messageByMe={messageByMe}
          />
        )
          // <audio controls>
          // 	<source src={attachments[0].path} />
          // 	Your browser does not support the audio tag.
          // </audio>
        }
        {!(messageType === 2) && (
          <Attachments
            data={attachments}
            key={{ data: attachments }}
            toShow={3}
            onClick={() => { }}
            size={isChatBox ? "75px" : "100px"}
          />
        )}
        <div className="textMessage">
          <div className="textMsgArea">{message}</div>
          <MessageStatusView messageByMe={messageByMe} status={status} />
        </div>
      </div>
    </div>
  );
};
export default MessengerListItem;
