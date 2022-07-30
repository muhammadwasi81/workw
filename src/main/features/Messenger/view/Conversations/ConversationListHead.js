import React, { useState } from "react";
import Avatar from "../../../../sharedComponents/Avatar/avatarOLD";
import CreateChat from "./CreateChat";

const ConversationListHead = () => {
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };
  return (
    <div className="ConversationListHead">
      <div>
        <Avatar
          src={
            "https://konnect.im/upload/2021/3/5325454b-1c5d-40f1-b95d-df0fad2d4da9.jpeg"
          }
          name={""}
          size={38}
          round={true}
        />
      </div>
      <div className="HeadName">Messenger</div>
      <div className="HeadIcon" onClick={showDrawer}>
        +
      </div>
      <CreateChat onClose={onClose} visible={visible} />
    </div>
  );
};
export default ConversationListHead;
