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

const ChatBoxHead = ({ chat, index }) => {
  let { profileImage, profileName, chatId } = chat;
  const dispatch = useDispatch();
  const handleClose = () => dispatch(handleRemoveChatBox(chat));
  const handleMinimize = () => dispatch(handleMinimizeChatBox({ index }));
  const handleExpend = () => dispatch(handleExpendChatBox({ index }));

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
          <SharedButton onClick={handleClose} icon={videoIcon} />
        </div>
        <div>
          <SharedButton onClick={handleClose} icon={phoneIcon} />
        </div>
        <div>
          <SharedButton
            onClick={handleMinimize}
            className="mb-[3px]"
            icon={mailMinimizeIcon}
          />
        </div>
        <div>
          <SharedButton onClick={handleExpend} icon={mailResizeIcon} />
        </div>
        <div>
          <SharedButton onClick={handleClose} icon={closeMailIcon} />
        </div>
      </div>
    </div>
  );
};
export default ChatBoxHead;
