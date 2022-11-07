import React from "react";
import { useSelector } from "react-redux";
import MessengerBottom from "../../Messenger/view/MessengerBox/body/MessengerBottom";
import MessengerList from "../../Messenger/view/MessengerBox/body/MessengerList";
import ChatBox from "./ChatBox";
import ChatBoxHead from "./ChatBoxHead";
import './style/index.css';

const ChatBoxCont = (props) => {
    const currentChatBoxes = useSelector(state => state.MessengerSlice.currentChatBoxes);
    return (
        <div className="ChatBoxCont">
            {
                currentChatBoxes.map((chat, index) => (
                    <ChatBox key={chat.chatId} chat={chat}>
                        <ChatBoxHead
                            chat={chat}
                            index={index} />
                        <MessengerList
                            isChatBox={true}
                            isOpenProfile={false}
                            messengerDetail={chat} />
                        <MessengerBottom
                            isChatBoxView={true}
                            messengerDetail={chat} />
                    </ChatBox>
                )
                )
            }
        </div>
    )
}
export default ChatBoxCont;