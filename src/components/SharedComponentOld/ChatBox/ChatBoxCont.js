import React from "react";
import { useSelector } from "react-redux";
import MessengerList from "../../MainMenu/Messenger/MessengerList";
import ChatBox from "./ChatBox";
import ChatBoxFoot from "./ChatBoxFoot";
import ChatBoxHead from "./ChatBoxHead";
import './style/index.css';

const ChatBoxCont = (props) => {
    const messageList = useSelector((state) => state.MessengerSlice.MessengerList)
    return (
        <div className="ChatBoxCont" >
            {
                [1, 2, 3].map((val) => (
                    <ChatBox>
                        <ChatBoxHead />
                        <MessengerList isChatBox={true} messageList={messageList.chatId} />
                        <ChatBoxFoot />
                    </ChatBox>
                )
                )
            }
        </div>
    )
}
export default ChatBoxCont;