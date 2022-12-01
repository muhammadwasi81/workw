import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Avatar from "../../../../sharedComponents/Avatar/avatarOLD";
import CreateChat from "../CreateChat";

const ConversationListHead = () => {
  const [visible, setVisible] = useState(false);
  const success = useSelector((state) => state.MessengerSlice.success);
  const { user } = useSelector((state) => state.userSlice);
  useEffect(() => {
    if (success)
      setVisible(false)
  }, [success])
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
          src={user.image}
          name={user.name}
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
