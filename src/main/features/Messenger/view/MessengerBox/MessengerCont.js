import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllMessages } from '../../store/Api';
import MessengerBottom from './MessengerBottom';
import MessengerHead from './MessengerHead';
import MessengerList from './MessengerList';
import MessengerProfile from './MessengerProfile';

const MessengerBox = () => {
    const dispatch = useDispatch();
    const messengerDetail = useSelector((state) => state.MessengerSlice.currentMessenger);
    const messageList = useSelector((state) => state.MessengerSlice.MessengerList[messengerDetail.chatId]);
    const [isOpenProfile, setIsOpenProfile] = useState(false);
    useEffect(()=>{
        dispatch(getAllMessages(messengerDetail.chatId))
    }, [messengerDetail])
    return (
        <div className="MessengerBox" >
            <MessengerHead
                handleProfileClick={() => setIsOpenProfile(true)}
                isOpenProfile={isOpenProfile}
                messengerDetail={messengerDetail} />
            <MessengerList
                messageList={messageList}
                isChatBox={false}
                isOpenProfile={isOpenProfile} />
            <MessengerBottom
                isOpenProfile={isOpenProfile} />
            {isOpenProfile &&
                <MessengerProfile hanldeClose={() => setIsOpenProfile(false)} />}
        </div>
    )
}
export default MessengerBox;