import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import MessengerListItem from './MessageItem';
import "../../../style/style.css";

// let isDidMount = true
const MessengerList = ({ isChatBox = true, isOpenProfile, messengerDetail }) => {
   const messageList = useSelector((state) => state.MessengerSlice.MessengerList[messengerDetail.chatId]);
   const MyRef = useRef("myRef");
   useEffect(() => {
      // if(isDidMount){
      //    isDidMount = false
      // }
      // else{
      //    MyRef.current.scrollIntoView({ behavior: "smooth" })
      // }
      MyRef.current.scrollIntoView({ behavior: "smooth" })
   }, [messageList])

   return (
      <div className={"MessengerList " + (isChatBox ? "ChatBoxMessages " : " ") + (isOpenProfile ? "blur-bg" : "")}  >
         {
            messageList && messageList.map((item, ind) => {
               return (
                  <MessengerListItem
                     key={ind}
                     messgeItem={item}
                     messengerDetail={messengerDetail}
                     isChatBox={isChatBox} />
               )
            })
         }
         <div ref={MyRef}></div>
      </div>
   )
}
export default MessengerList;