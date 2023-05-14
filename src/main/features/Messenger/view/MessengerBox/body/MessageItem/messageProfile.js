import React from 'react';
import Avatar from '../../../../../../sharedComponents/Avatar/avatarOLD';

const MessageProfile = ({ creator = {}, isChatBox, messageByMe, isGroupMessage }) => {
    if (messageByMe || isGroupMessage)
        return;

    return (
        <div>
            <Avatar
                src={creator?.image}
                name={creator?.name}
                size={30}
                round={true}
            />
        </div>
    )
}
export default MessageProfile;