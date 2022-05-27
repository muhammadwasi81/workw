import React, { useEffect } from 'react';
import Avatar from '../../../../../components/SharedComponent/Avatar/avatar';
import phoneIcon from "../../../../../content/NewContent/Messenger/phone.svg";
import videoIcon from "../../../../../content/NewContent/Messenger/video.svg";
import infoIcon from "../../../../../content/NewContent/Messenger/info.svg";
import arrowIcon from "../../../../../content/NewContent/Messenger/leftArrow.svg";
import { useDispatch } from 'react-redux';
import { handleIsopenChat } from '../../store/messengerSlice';


const MessengerHead = ({ handleProfileClick, isOpenProfile, messengerDetail }) => {
    const dispatch = useDispatch();
    const { profileName, profileImage, chatId, chatType } = messengerDetail;
    useEffect(()=>{
        
    }, [])
    return (
        <div className={"MessengerHead " + (isOpenProfile ? "blur-bg" : "")} >
            <div className="MessengerHeadAvatar MessengerHeadAvatar-Mob" >
                <img src={arrowIcon} alt="" onClick={() => {
                    dispatch(handleIsopenChat(false));
                }} />
                <div onClick={() => {
                    handleProfileClick()
                }}>
                    <Avatar src={profileImage} name={profileName} size={40} round={true} />
                </div>
            </div>
            <div className="MessengerHeadName" >
                <div >
                    {profileName}
                </div>
            </div>
            <div className="MessengerHeadIcon" >
                <div>
                    <img src={phoneIcon} alt="" />
                    <img src={videoIcon} className="videoIcon" alt="" />
                    <img src={infoIcon} alt="" onClick={handleProfileClick}/>
                </div>
            </div>

        </div>
    )
}
export default MessengerHead;