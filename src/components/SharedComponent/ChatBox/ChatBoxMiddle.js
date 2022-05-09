import React from "react";
import { useSelector } from "react-redux";
import MessengerListItem from "../../MainMenu/Messenger/MessengerListItem";
import '../../MainMenu/Messenger/style.css'

const ChatBoxMiddle = (props) => {
    const ChatList = useSelector((state) => state.MessengerSlice.MessengerList.chatId)
  return(
    <div className="ChatBoxMsgCont">
        <div className="MessengerList">
     {
            ChatList.map((val) => {
               return (
                  <MessengerListItem id={val.id} Content={val.msgContent} msgId={val.msgId} />
               )
            })
         }  
         </div>
    </div>
  )
}
export default ChatBoxMiddle;