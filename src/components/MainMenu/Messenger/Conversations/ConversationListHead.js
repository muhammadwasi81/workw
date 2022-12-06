import React from 'react';
import Avatar from '../../../SharedComponent/Avatar/avatar';

const ConversationListHead = () => {
  return (
    <div className="ConversationListHead">
      <div>
        <Avatar
          src={
            'https://konnect.im/upload/2021/3/5325454b-1c5d-40f1-b95d-df0fad2d4da9.jpeg'
          }
          name={''}
          size={38}
          round={true}
        />
      </div>
      <div className="HeadName">Messenger</div>
      <div className="HeadIcon">+</div>
    </div>
  );
};
export default ConversationListHead;
