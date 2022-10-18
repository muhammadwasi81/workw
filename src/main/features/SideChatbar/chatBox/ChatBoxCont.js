import React from "react";
import { useSelector } from "react-redux";
import MessengerBottom from "../../Messenger/view/MessengerBox/body/MessengerBottom";
import MessengerList from "../../Messenger/view/MessengerBox/body/MessengerList";
// import MessengerList from "../../features/Messenger/view/MessengerBox/body/MessengerList";
// import MessengerList from "../../MainMenu/Messenger/MessengerList";
import ChatBox from "./ChatBox";
import ChatBoxFoot from "./ChatBoxFoot";
import ChatBoxHead from "./ChatBoxHead";
import './style/index.css';

const ChatBoxCont = (props) => {
    const messageList = useSelector((state) => state.MessengerSlice.MessengerList);
    const currentChatBoxes = useSelector(state => state.MessengerSlice.currentChatBoxes);
    return (
        <div className="ChatBoxCont" onMou>
            {
                currentChatBoxes.map((val) => (
                    <ChatBox>
                        <ChatBoxHead />
                        <MessengerList
                            isChatBox={true}
                            messageList={messageList["4189c4d9-416e-4958-a202-a4d38c88c2d5"]}
                            isOpenProfile={false}
                            messengerDetail={{}}
                        />
                        {/* <MessengerBottom /> */}
                        <ChatBoxFoot />
                    </ChatBox>
                )
                )
            }
        </div>
    )
}
export default ChatBoxCont;