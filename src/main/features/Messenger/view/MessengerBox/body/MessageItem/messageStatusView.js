import React from 'react';

const messageStatusView = ({ messageByMe, status }) => {
    return (
        <div className='h-full flex align-items-center'>
            {messageByMe && status}
        </div>
    )
}
export default messageStatusView;