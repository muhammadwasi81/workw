import React from 'react';
import Avatar from '../../../../../../sharedComponents/Avatar/avatarOLD';

const MessageProfile = ({ creator = {}, isChatBox, messageByMe, isGroupMessage }) => {
    let { image, name } = creator;
    if (messageByMe || isGroupMessage)
        return;

    return (
        <div>
            <Avatar
                src={image}
                name={name}
                size={30}
                round={true}
            />
        </div>
    )
}
export default MessageProfile;