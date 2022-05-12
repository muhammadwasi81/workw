import React from 'react';
import Avatar from '../../../../../components/SharedComponent/Avatar/avatar';
import phoneIcon from "../../../../../content/NewContent/Messenger/phone.svg";
import videoIcon from "../../../../../content/NewContent/Messenger/video.svg";
import infoIcon from "../../../../../content/NewContent/Messenger/info.svg";
import arrowIcon from "../../../../../content/NewContent/Messenger/leftArrow.svg";
import { useDispatch } from 'react-redux';
import { handleIsopenChat } from '../../store/messengerSlice';


const MessengerHead = ({ handleProfileClick, isOpenProfile }) => {
    const dispatch = useDispatch()
    return (
        <div className={"MessengerHead " + (isOpenProfile ? "blur-bg" : "")} >
            <div className="MessengerHeadAvatar MessengerHeadAvatar-Mob" >
                <img src={arrowIcon} alt="" onClick={() => {
                    dispatch(handleIsopenChat(false));
                }} />
                <div onClick={() => {
                    handleProfileClick()
                }}>
                    <Avatar src={"https://konnect.im/upload/2021/3/5325454b-1c5d-40f1-b95d-df0fad2d4da9.jpeg"} name={""} size={40} round={true} />
                </div>
            </div>
            <div className="MessengerHeadName" >
                <div >
                    Abu Bakar Memon
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