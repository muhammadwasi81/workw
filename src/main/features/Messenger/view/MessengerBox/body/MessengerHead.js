import React, { useEffect } from 'react';
import Avatar from '../../../../../sharedComponents/Avatar/avatarOLD';
import phoneIcon from '../../../../../../content/NewContent/Messenger/callIcon.svg';
import videoIcon from '../../../../../../content/NewContent/Messenger/videoIcon.svg';
import infoIcon from '../../../../../../content/NewContent/Messenger/infoIcon.svg';
import arrowIcon from '../../../../../../content/NewContent/Messenger/leftArrow.svg';
import { useDispatch } from 'react-redux';
import { handleIsopenChat } from '../../../store/messengerSlice';
import { createRoom } from '../../../../calling/store/action';
import { InitializeCallingSocket } from '../../../../calling/services/socket';

const MessengerHead = ({
  handleProfileClick,
  isOpenProfile,
  messengerDetail,
}) => {
  const dispatch = useDispatch();
  console.log(messengerDetail, "messengerDetailmessengerDetail");
  const { profileName, profileImage, chatId, chatType, members } = messengerDetail;
  useEffect(() => { }, []);
  const handleCall = () => {
    let payload = {
      roomPassword: "",
      private: false,
      members: members.map((member) => ({
        admin: false,
        exteral: false,
        exteralEmail: null,
        userId: member.id
      }))
    }
    dispatch(createRoom(payload));
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
          <img src={phoneIcon}
            onClick={handleCall}
            alt="phoneIcon"
            className="cursor-pointer" />
          <img
            src={videoIcon}
            onClick={handleCall}
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
