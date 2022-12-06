import React, { useEffect } from 'react';
import Avatar from '../../../../../sharedComponents/Avatar/avatarOLD';
import phoneIcon from '../../../../../../content/NewContent/Messenger/callIcon.svg';
import videoIcon from '../../../../../../content/NewContent/Messenger/videoIcon.svg';
import infoIcon from '../../../../../../content/NewContent/Messenger/infoIcon.svg';
import arrowIcon from '../../../../../../content/NewContent/Messenger/leftArrow.svg';
import { useDispatch } from 'react-redux';
import { handleIsopenChat } from '../../../store/messengerSlice';

const MessengerHead = ({
  handleProfileClick,
  isOpenProfile,
  messengerDetail,
}) => {
  const dispatch = useDispatch();
  const { profileName, profileImage, chatId, chatType } = messengerDetail;
  useEffect(() => {}, []);
  return (
    <div className={'MessengerHead ' + (isOpenProfile ? 'blur-bg' : '')}>
      <div className="MessengerHeadAvatar MessengerHeadAvatar-Mob">
        <img
          src={arrowIcon}
          alt=""
          onClick={() => {
            dispatch(handleIsopenChat(false));
          }}
        />
        <div onClick={handleProfileClick}>
          <Avatar
            src={profileImage}
            name={profileName}
            size={40}
            round={true}
          />
        </div>
      </div>
      <div className="MessengerHeadName">
        <div>{profileName}</div>
      </div>
      <div className="MessengerHeadIcon">
        <div>
          <img src={phoneIcon} alt="phoneIcon" className="cursor-pointer" />
          <img
            src={videoIcon}
            className="videoIcon cursor-pointer"
            alt="videoIcon"
          />
          <img
            src={infoIcon}
            alt="infoIcon"
            onClick={handleProfileClick}
            className="cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};
export default MessengerHead;
