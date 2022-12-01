import React, { useEffect, useState, useContext } from "react";
import { useSelector } from "react-redux";
import Avatar from "../../../../sharedComponents/Avatar/avatarOLD";
import CreateChat from "../CreateChat";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
import { messengerDictionaryList } from "../../localization";

const ConversationListHead = () => {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { messengerDictionary } = messengerDictionaryList[userLanguage];

  const [visible, setVisible] = useState(false);
  const success = useSelector((state) => state.MessengerSlice.success);

  useEffect(() => {
    if (success) setVisible(false);
  }, [success]);
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
      <div className="HeadName">{messengerDictionary.messenger}</div>
      <div className="HeadIcon" onClick={showDrawer}>
        +
      </div>
      <CreateChat onClose={onClose} visible={visible} />
    </div>
  );
};
export default ConversationListHead;
