import React from 'react';
import faceIcon from "../../../../../content/NewContent/Messenger/face.svg";
import pictureIcon from "../../../../../content/NewContent/Messenger/picture.svg";
import attachmentIcon from "../../../../../content/NewContent/Messenger/attachment.svg";
import sendIcon from "../../../../../content/NewContent/Messenger/send.svg";
import { sendMessage } from '../../store/messengerSlice';
import { useDispatch } from 'react-redux';
import { sendChatMessage } from '../../store/Api';

const MessengerBottom = ({isOpenProfile}) => {
    const dispatch = useDispatch();
    const handleMsgSend = (e) => {
        dispatch(sendMessage(e.target.value))
        dispatch(sendChatMessage(e.target.value))
    }
    return (
        <div className={"MessengerBottom " + (isOpenProfile ? "blur-bg" : "")} >
            <div className="MessengerInputCont">
                <div className="MessengerInput">
                    <div>
                        <input placeholder="Type a Message..." onKeyUp={(e)=>{
                            if(e.keyCode === 13)
                                handleMsgSend(e)
                        }} />
                    </div>
                </div>
            </div>
            <div className="MessengerInputHandler">
                <div>
                    <img src={faceIcon} alt="" />
                    <img src={pictureIcon} alt=""/>
                    <img src={attachmentIcon} alt=""/>
                    <img src={sendIcon} alt=""/>
                </div>
            </div>

        </div>
    )
}
export default MessengerBottom;