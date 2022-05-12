import React, {useEffect, useRef, useState} from 'react';
import { useSelector } from 'react-redux';
import MessengerListItem from './MessengerListItem';

// let isDidMount = true
const MessengerList = ({isChatBox=true, messageList, isOpenProfile}) => {
  const MyRef = useRef("myRef")
   useEffect(()=>{
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
            messageList.map((val) => {
               return (
                  <MessengerListItem id={val.id} Content={val.msgContent} msgId={val.msgId} />
               )
            })
         }    
      <div ref={MyRef}></div>
      </div>
   )
}
export default MessengerList;