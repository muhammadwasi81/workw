import React from 'react';
import ConversationListItem from './ConversationListItem';

const ConversationList = () => {
    return (
        <div className="ConversationList" >
         {
             [{chatId:"123"},{chatId:"456"}].map((val, ind)=>{
                 return(
                     <ConversationListItem key={ind}/>
                 )
             })
         }
        </div>
    )
}
export default ConversationList;