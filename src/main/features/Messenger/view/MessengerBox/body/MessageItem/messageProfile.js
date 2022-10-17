import React from 'react';
import Avatar from '../../../../../../sharedComponents/Avatar/avatarOLD';

const MessageProfile = ({creator={}}) => {
    let { image, name } = creator;
    return(
        <div>
        <Avatar
            src={image ? image : "https://konnect.im/upload/2021/3/5325454b-1c5d-40f1-b95d-df0fad2d4da9.jpeg" }
            name={name}
            size={35}
            round={true}
        />
    </div>
    )
}
export default MessageProfile;