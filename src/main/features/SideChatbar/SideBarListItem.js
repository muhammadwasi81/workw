import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { STRINGS } from "../../../utils/base";
import Avatar from "../../sharedComponents/Avatar/avatarOLD";
import { handleChatBoxAppend, handleMessengerItemClick } from "../Messenger/store/messengerSlice";
import { MESSENGER_ENUMS } from "../Messenger/utils/Constant";
// import Avatar from "../../SharedComponent/Avatar/avatar";

export const SideBarListItem = ({ item }) => {
  const sideBarStatus = useSelector((state) => state.sideBarChatSlice.sideBarChatStatus);
  const sideBarChatIsDefault = useSelector((state) => state.sideBarChatSlice.sideBarChatIsDefault);
  const dispatch = useDispatch();
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
      lastMessage: "",
    },
    lastUpdate = "",
  } = item;

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
    // TODO: handleMessengerItemClick for manage Global State of Messnger
    let chatMembers =
      chatType === MESSENGER_ENUMS.CHAT_TYPES.INDIVIDUAL_CHAT
        ? [chatWith]
        : [];
    dispatch(
      handleChatBoxAppend({
        chatId: id,
        profileName: profileName,
        profileImage: profileImage,
        chatType: chatType,
        members: chatMembers,
      })
    );
  };


  return (
    <div className="sideBarListItem" onClick={handleItemClick}>
      <div className="sideBarListAvatar" >
        <Avatar src={profileImage} name={profileName} size={40} round={true} counter={1} />
      </div>
      <div className={`sideBarListName ${sideBarChatIsDefault ? "hideMe" : !sideBarStatus ? "hideSideBarItem" : "unHideSideBarItem"}`}>
        {profileName}
      </div>
    </div>
  )
}

export default SideBarListItem;