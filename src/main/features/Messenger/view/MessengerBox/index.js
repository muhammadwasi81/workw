import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { STRINGS } from '../../../../../utils/base';
import { getAllMessages } from '../../store/Api';
import MessengerBottom from './body/MessengerBottom';
import MessengerHead from './body/MessengerHead';
import MessengerList from './body/MessengerList';
import MessengerProfile from './helpers/MessengerProfile';
import EmptyMessenger from './helpers/EmptyMessenger';

const MessengerBox = () => {
    const dispatch = useDispatch();
    const messengerDetail = useSelector((state) => state.MessengerSlice.currentMessenger);
    const messageList = useSelector((state) => state.MessengerSlice.MessengerList[messengerDetail.chatId]);
    const [isOpenProfile, setIsOpenProfile] = useState(false);
    const isEmptyMessenger = messengerDetail.members.length === 0 && messengerDetail.chatId === STRINGS.DEFAULTS.guid;
    useEffect(() => {
        dispatch(getAllMessages({ chatId: messengerDetail.chatId, pageNo:1 }))
    }, [messengerDetail]);
    if (isEmptyMessenger)
        return <EmptyMessenger />
    return (
        <div className="MessengerBox" >
            <MessengerHead
                handleProfileClick={() => setIsOpenProfile(true)}
                isOpenProfile={isOpenProfile}
                messengerDetail={messengerDetail} />
            <MessengerList
                messageList={messageList}
                isChatBox={false}
                isOpenProfile={isOpenProfile}
                messengerDetail={messengerDetail} />
            <MessengerBottom
                isOpenProfile={isOpenProfile} />
            {isOpenProfile &&
                <MessengerProfile hanldeClose={() => setIsOpenProfile(false)} />}
        </div>
    )
}
export default MessengerBox;