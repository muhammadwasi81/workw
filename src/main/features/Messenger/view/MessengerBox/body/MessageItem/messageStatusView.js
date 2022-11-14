import React from 'react';
import pendingIcon from '../../../../../../../content/NewContent/Messenger/pendingMsg.svg'
import sendIcon from '../../../../../../../content/NewContent/Messenger/sentMsg.svg'
import deliverIcon from '../../../../../../../content/NewContent/Messenger/readMsg.svg'
import errorIcon from '../../../../../../../content/NewContent/Messenger/errorMsg.svg'

export const getIconByStatus = (status) => {
    console.log(status, "Status")
    switch (status) {
        case "Pending":
            return pendingIcon
        case "Error":
            return errorIcon
        case 1:
            return sendIcon
        case 2:
            return deliverIcon
        case 3:
            return deliverIcon
        default:
            return;
    }
}

const MessageStatusView = ({ messageByMe, status }) => {
    return (
        <div className='messageStatus'>
            <span className='messageTime'>
                13:10
            </span>
            {
                messageByMe &&
                <img
                    className='h-[7px]'
                    src={getIconByStatus(status)}
                />
            }
        </div>
    )
}
export default MessageStatusView;