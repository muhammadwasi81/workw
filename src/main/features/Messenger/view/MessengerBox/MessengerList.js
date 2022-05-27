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
      MyRef.current.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" })
  }, [messageList])

   return (
      <div className={"MessengerList " + (isChatBox ? "ChatBoxMessages " : " ") + (isOpenProfile ? "blur-bg" : "")}  >
         {
           messageList && messageList.map((item, ind) => {
               return (
                  <MessengerListItem key={ind} messgeItem={item} />
               )
            })
         }    
      <div ref={MyRef}></div>
      </div>
   )
}
export default MessengerList;