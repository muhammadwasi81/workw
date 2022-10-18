import React from "react";
// import SharedButton from "../button";
import faceIcon from './assests/face.svg';
import PictureIcon from './assests/picture.svg';
import attachmentIcon from './assests/attachment.svg';
import sendIcon from './assests/send.svg';
import { useDispatch } from "react-redux";
import { sendChatMessage } from "../../Messenger/store/actions";
import SharedButton from "../../../sharedComponents/button";

const ChatBoxFoot = (props) => {
    const dispatch = useDispatch()
    const handleMsgSend = (e) => {
        dispatch(sendChatMessage(e.target.value))
    }
    return (
        <div className="ChatBoxFoot" >
            <div className="ChatBoxInputHandler" >
                <div>
                    <SharedButton
                        type="default"
                        shape="circle"
                        size="small"
                        onClick={() => { }}
                        icon={faceIcon}
                        IconSize={15}
                    />
                </div>

                <div>
                    <SharedButton
                        type="default"
                        shape="circle"
                        size="small"
                        onClick={() => { }}
                        // icon={PictureIcon}
                        icon={attachmentIcon}
                        className="mt-[2px]"
                        IconSize={9}
                    />
                </div>
            </div>
            <div className="ChatBoxInput" >
                <div>
                    <input placeholder="Type a Message..." onKeyUp={(e) => {
                        if (e.keyCode === 13) {
                            handleMsgSend(e)
                        }
                    }} />
                </div>
            </div>
            <div className="" >
                <div>
                    <SharedButton
                        type="default"
                        shape="circle"
                        size="small"
                        onClick={() => { }}
                        icon={sendIcon}
                        IconSize={15}
                    />
                </div>
            </div>
        </div>
    )
}
export default ChatBoxFoot;