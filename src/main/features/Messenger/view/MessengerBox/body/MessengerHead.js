import React, { useEffect } from 'react';
import Avatar from '../../../../../sharedComponents/Avatar/avatarOLD';
import phoneIcon from '../../../../../../content/NewContent/Messenger/callIcon.svg';
import videoIcon from '../../../../../../content/NewContent/Messenger/videoIcon.svg';
import infoIcon from '../../../../../../content/NewContent/Messenger/infoIcon.svg';
import arrowIcon from '../../../../../../content/NewContent/Messenger/leftArrow.svg';
import { useDispatch } from 'react-redux';
import { handleIsopenChat } from '../../../store/messengerSlice';
import { createDirectCall, createRoom } from '../../../../calling/store/action';
import { InitializeCallingSocket } from '../../../../calling/services/socket';
import { CALL_MEDIA_TYPE } from '../../../../calling/constant/enum';

const MessengerHead = ({
  handleProfileClick,
  isOpenProfile,
  messengerDetail,
}) => {
  const dispatch = useDispatch();
  const { profileName, profileImage, chatId, chatType, members } = messengerDetail;
  useEffect(() => { }, []);
  const handleCall = (isVideoCall = false) => {
    let payload = {
      roomPassword: "",
      private: false,
      members: members.map((member) => ({
        admin: false,
        exteral: false,
        exteralEmail: null,
        userId: member.id,
        user: member
      })),
      mediaType: isVideoCall ? CALL_MEDIA_TYPE.VIDEO : CALL_MEDIA_TYPE.AUDIO,
      isVideo: isVideoCall
    }
    dispatch(createDirectCall(payload));
    // const callingSocket = InitializeCallingSocket.getInstance();
    // callingSocket.startCalling(payload.members)
  }
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
            size={42}
            round={true}
          />
        </div>
      </div>
      <div className="MessengerHeadName">
        <div>{profileName}</div>
      </div>
      <div className="MessengerHeadIcon">
        <div>
          <img src={phoneIcon}
            onClick={() => handleCall(false)}
            alt="phoneIcon"
            className="cursor-pointer" />
          <img
            src={videoIcon}
            onClick={() => handleCall(true)}
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
