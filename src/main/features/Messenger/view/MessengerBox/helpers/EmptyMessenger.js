import React from 'react';
import startChatIcon from '../../../../../../content/NewContent/Messenger/startChat.svg';

const EmptyMessenger = () => {
    return(
        <div className='EmptyMessengerIcon' >
            <h1>Say hi to your Contacts</h1>
            <img src={startChatIcon} />
        </div>
    )
}
export default EmptyMessenger;