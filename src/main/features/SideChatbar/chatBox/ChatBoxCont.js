import React from "react";
import { useSelector } from "react-redux";
import MessengerList from "../../Messenger/view/MessengerBox/body/MessengerList";
// import MessengerList from "../../features/Messenger/view/MessengerBox/body/MessengerList";
// import MessengerList from "../../MainMenu/Messenger/MessengerList";
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
                        <h2>ddfkj</h2>
                        <MessengerList
                            isChatBox={true}
                            messageList={messageList["4189c4d9-416e-4958-a202-a4d38c88c2d5"]}
                            isOpenProfile={false}
                            messengerDetail={{}}
                        />
                        <ChatBoxFoot />
                    </ChatBox>
                )
                )
            }
        </div>
    )
}
export default ChatBoxCont;