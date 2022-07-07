import React from "react";
import { useSelector } from "react-redux";
import MessengerListItem from "../../features/Messenger/MessengerListItem";
import '../../features/Messenger/style.css'
import MessengerList from "../../features/Messenger/view/MessengerBox/body/MessengerList";

const ChatBoxMiddle = (props) => {
    const ChatList = useSelector((state) => state.MessengerSlice.MessengerList["4189c4d9-416e-4958-a202-a4d38c88c2d5"])
  return(
    <div className="ChatBoxMsgCont">
        <div className="MessengerList">
        <MessengerList
                messageList={ChatList}
                isChatBox={false}
                isOpenProfile={false}
                messengerDetail={{}} />
     {/* {
            ChatList.map((val) => {
               return (
                  <MessengerListItem id={val.id} Content={val.msgContent} msgId={val.msgId} />
               )
            })
         }   */}
         </div>
    </div>
  )
}
export default ChatBoxMiddle;