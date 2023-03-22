import React from 'react';
import mailMinimizeIcon from './assests/mailMinimizeIcon.svg';
import closeMailIcon from './assests/closeMailIcon.svg';
import mailResizeIcon from './assests/mailResizeIcon.svg';
import Avatar from '../../../sharedComponents/Avatar/avatarOLD';
import SharedButton from '../../../sharedComponents/button';
import { useDispatch } from 'react-redux';
import {
  handleExpendChatBox,
  handleMinimizeChatBox,
  handleRemoveChatBox,
} from '../../Messenger/store/messengerSlice';
import phoneIcon from '../../../../content/NewContent/Messenger/callWhiteIcon.svg';
import videoIcon from '../../../../content/NewContent/Messenger/videoWhiteIcon.svg';
import { createRoom } from '../../calling/store/action';
import { CHATBOX_ENUM } from '../utils/constant';

const ChatBoxHead = ({ chat, index }) => {
  let { profileImage, profileName, chatId, members, isMinimize } = chat;
  const dispatch = useDispatch();
  const handleClose = () => dispatch(handleRemoveChatBox(chat));
  const handleMinimize = () => dispatch(handleMinimizeChatBox({ index }));
  const handleExpend = () => dispatch(handleExpendChatBox({ index }));

  const handleCall = () => {
    let payload = {
      roomPassword: "",
      private: false,
      members: members.map((member) => ({
        admin: false,
        exteral: false,
        exteralEmail: null,
        userId: member.id,
        user: member
      }))
    }
    dispatch(createRoom(payload))
  }

  return (
    <div className="ChatBoxHead">
      <div className="ChatBoxName" onClick={handleMinimize}>
        <Avatar
          src={profileImage}
          height={30}
          width={30}
          name="Abu Bakar"
          round
        />
        <div className="chatName">{profileName}</div>
      </div>
      <div>
        <div>
          <SharedButton onClick={handleCall} icon={videoIcon} isHide={isMinimize === CHATBOX_ENUM.BOOLEAN.TRUE} />
        </div>
        <div>
          <SharedButton onClick={handleCall} icon={phoneIcon} isHide={isMinimize === CHATBOX_ENUM.BOOLEAN.TRUE}/>
        </div>
        <div>
          <SharedButton onClick={handleMinimize} className="mb-[3px]" icon={mailMinimizeIcon} />
        </div>
        <div>
          <SharedButton onClick={handleExpend} icon={mailResizeIcon} isHide={isMinimize === CHATBOX_ENUM.BOOLEAN.TRUE}/>
        </div>
        <div>
          <SharedButton onClick={handleClose} icon={closeMailIcon} />
        </div>
      </div>
    </div>
  );
};
export default ChatBoxHead;
