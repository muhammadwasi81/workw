import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { STRINGS } from '../../../../../utils/base';
import MessengerBottom from './body/MessengerBottom';
import MessengerHead from './body/MessengerHead';
import MessengerList from './body/MessengerList';
import MessengerProfile from './components/MessengerProfile';
import EmptyMessenger from './components/EmptyMessenger';
import { getAllChatMessage } from '../../store/actions';

const MessengerBox = () => {
    const messengerDetail = useSelector((state) => state.MessengerSlice.currentMessenger);
    // const messageList = useSelector((state) => state.MessengerSlice.MessengerList[messengerDetail.chatId]);
    const [isOpenProfile, setIsOpenProfile] = useState(false);
    const isEmptyMessenger = messengerDetail.members.length === 0 && messengerDetail.chatId === STRINGS.DEFAULTS.guid;

    if (isEmptyMessenger)
        return <EmptyMessenger />
    return (
        <div className="MessengerBox" >
            <MessengerHead
                handleProfileClick={() => setIsOpenProfile(true)}
                isOpenProfile={isOpenProfile}
                messengerDetail={messengerDetail} />
            <MessengerList
                isChatBox={false}
                isOpenProfile={isOpenProfile}
                messengerDetail={messengerDetail} />
            <MessengerBottom
                isOpenProfile={isOpenProfile}
                messengerDetail={messengerDetail} />
            {isOpenProfile &&
                <MessengerProfile
                    hanldeClose={() => setIsOpenProfile(false)}
                    messengerDetail={messengerDetail} />}
        </div>
    )
}
export default MessengerBox;