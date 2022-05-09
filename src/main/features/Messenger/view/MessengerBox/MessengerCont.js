import React from 'react';
import { useSelector } from 'react-redux';
import MessengerBottom from './MessengerBottom';
import MessengerHead from './MessengerHead';
import MessengerList from './MessengerList';

const MessengerBox = () => {
    const messageList = useSelector((state) => state.MessengerSlice.MessengerList.chatId)
    return (
        <div className="MessengerBox" >
        <MessengerHead />
        <MessengerList messageList={messageList} isChatBox={false}/>
        <MessengerBottom />
        </div>
    )
}
export default MessengerBox;