import React from "react";
import './style/index.css'

const ChatBox = ({children}) => {
    return (
        <div className="ChatBox">
            {children}
        </div>
    )
}
export default ChatBox;