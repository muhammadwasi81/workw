import React from 'react';
import Avatar from '../../../../../../sharedComponents/Avatar/avatarOLD';

const VoiceNoteView = ({ creator = {} }) => {
    let { image, name } = creator;
    return (
        <audio controls>
            <source src={attachments[0].path} />
            Your browser does not support the audio tag.
        </audio>
    )
}
export default VoiceNoteView;