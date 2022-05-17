import React, {useState} from 'react';
import { useSelector } from 'react-redux';
import MessengerBottom from './MessengerBottom';
import MessengerHead from './MessengerHead';
import MessengerList from './MessengerList';
import MessengerProfile from './MessengerProfile';

const MessengerBox = () => {
    const messageList = useSelector((state) => state.MessengerSlice.MessengerList.chatId);
    const [isOpenProfile, setIsOpenProfile] = useState(false);
    return (
        <div className="MessengerBox" >
        <MessengerHead handleProfileClick={()=>setIsOpenProfile(true)} isOpenProfile={isOpenProfile} />
        <MessengerList messageList={messageList} isChatBox={false} isOpenProfile={isOpenProfile}/>
        <MessengerBottom isOpenProfile={isOpenProfile}/>
        {isOpenProfile && <MessengerProfile hanldeClose={()=>setIsOpenProfile(false)}/>}
        </div>
    )
}
export default MessengerBox;