import React from 'react';
import ConversationListItem from './ConversationListItem';

const ConversationList = () => {
  return (
    <div className="ConversationList">
      {[
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        12,
        3,
        4,
        5,
        6,
        4,
        42,
        2,
        3,
        4,
        4,
        5,
        4,
        4,
        31,
        1,
      ].map((val) => {
        return <ConversationListItem />;
      })}
    </div>
  );
};
export default ConversationList;
