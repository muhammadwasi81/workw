import { Badge } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import Avatar from '../../../SharedComponent/Avatar/avatar';
import { handleIsopenChat } from '../store/messengerSlice';

const ConversationListItem = () => {
  const dispatch = useDispatch();
  return (
    <div
      className="ConversationListItem"
      onClick={() => dispatch(handleIsopenChat(true))}
    >
      <div className="ItemDP">
        <Avatar
          src={
            'https://konnect.im/upload/2021/3/5325454b-1c5d-40f1-b95d-df0fad2d4da9.jpeg'
          }
          name={''}
          size={38}
          round={true}
        />
      </div>
      <div className="ItemNameCont">
        <div className="ItemName">Abu Bakar Memon</div>
        <div className="ItemLastMsgCont">
          <div className="ItemLastMsg">Hi, How are you! What do you do</div>
          <div className="ItemLastMsgTime">.10 Min</div>
        </div>
      </div>
      <div className="ItemIcon">
        <Badge count={0} />
        {/* <Avatar src={"https://konnect.im/upload/2021/3/5325454b-1c5d-40f1-b95d-df0fad2d4da9.jpeg"} name={""} size={20} round={true} /> */}
      </div>
    </div>
  );
};
export default ConversationListItem;
