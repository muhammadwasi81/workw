import React from 'react';
import {useSelector} from 'react-redux';
import ConversationListCont from './Conversations/ConversationListCont';
import MessengerBox from './MessengerBox/MessengerCont';
import './style.css';

const Index = () => {
    const {isMobileScreen} = useSelector(state => state.responsiveSlice);
    const isOpenMessenger = useSelector((state) => state.MessengerSlice.mobileIsopenChat)
    return (
        <div className={`MessengerCont ${isMobileScreen && isOpenMessenger === true ? "openMobileMessenger" :
            isMobileScreen && isOpenMessenger === false ? "closeMobileMessenger" : ""}`}>
            <ConversationListCont/>
            <MessengerBox/>
        </div>
    )
}
export default Index;