import React from "react";
import { useSelector } from "react-redux";
import MessengerList from "../../../main/features/Messenger/view/MessengerBox/body/MessengerList";
import ChatBox from "./ChatBox";
import ChatBoxFoot from "./ChatBoxFoot";
import ChatBoxHead from "./ChatBoxHead";
import './style/index.css';

const ChatBoxCont = ({ isHide }) => {
    const messageList = useSelector((state) => state.MessengerSlice.MessengerList)
    return (
        <div className="ChatBoxCont"
            style={{ display: isHide ? "none" : "flex" }}
        >
            {
                [1, 1, 1].map((val) => (
                    <ChatBox>
                        <ChatBoxHead />
                        <MessengerList isChatBox={true} messageList={messageList["f8f9133b-e3d8-4692-75f4-8fdab58fcd0d"]} />
                        <ChatBoxFoot />
                    </ChatBox>
                )
                )
            }
        </div>
    )
}
export default ChatBoxCont;