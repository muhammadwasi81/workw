import React from "react";
import { CHATBOX_ENUM } from "../utils/constant";
import './style/index.css'

const ChatBox = ({ children, chat }) => {
    let { isMinimize, isExtend } = chat;
    const getConditionalClasses = () => {
        const { BOOLEAN } = CHATBOX_ENUM;
        let classes = "";
        classes += (isMinimize === BOOLEAN.TRUE ? " minimizeChatBox" :
            isMinimize === BOOLEAN.FALSE ? " minimizeCloseChatBox"
                : "");
        classes += (isExtend === BOOLEAN.TRUE ? " extendChatBox" :
        isExtend === BOOLEAN.FALSE ? " extendCloseChatBox"
                : "");
                return classes
    }
    
    let classes = getConditionalClasses();
    return (
        <div className={`ChatBox${classes}`} >
            {children}
        </div>
    )
}
export default ChatBox;