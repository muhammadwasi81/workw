import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import MessengerListItem from './MessageItem';

// let isDidMount = true
const MessengerList = ({ isChatBox = true, messageList, isOpenProfile, messengerDetail }) => {
   const MyRef = useRef("myRef")
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
                     messengerDetail={messengerDetail} />
               )
            })
         }
         <div ref={MyRef}></div>
      </div>
   )
}
export default MessengerList;