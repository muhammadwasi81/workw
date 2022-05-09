import React from 'react';
// import { useDispatch } from 'react-redux';
import Avatar from '../../../SharedComponent/Avatar/avatar';

const MessengerListItem = ({ id, Content, msgId }) => {
    // const dispatch = useDispatch();

    return (
        <div id={msgId} className={id !== "ME" ? "MessengerListItem" : "MessengerListItem-ME"} >

            <div>
                <Avatar src={"https://konnect.im/upload/2021/3/5325454b-1c5d-40f1-b95d-df0fad2d4da9.jpeg"} name={""} size={35} round={true} />
            </div>

            <div className="MessageBubble"   >
                {
                    Content
                }
            </div>

        </div>
    )
}
export default MessengerListItem;