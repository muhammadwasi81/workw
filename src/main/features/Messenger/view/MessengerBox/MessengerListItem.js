import React from "react";
// import { useDispatch } from 'react-redux';
import Avatar from "../../../../sharedComponents/Avatar/avatar";

const MessengerListItem = ({ messgeItem }) => {
  // const dispatch = useDispatch();
  const { id, message, messageType, attachments, messageByMe } = messgeItem;

  return (
    <div id={id} className={!messageByMe ? "MessengerListItem" : "MessengerListItem-ME"}>
      <div>
        <Avatar src={"https://konnect.im/upload/2021/3/5325454b-1c5d-40f1-b95d-df0fad2d4da9.jpeg"} name={""} size={35} round={true} />
      </div>
      <div className="MessageBubble">{message}</div>
    </div>
  );
};
export default MessengerListItem;
