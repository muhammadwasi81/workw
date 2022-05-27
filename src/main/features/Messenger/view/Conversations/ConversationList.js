import React from 'react';
import { useSelector } from 'react-redux';
import ConversationListItem from './ConversationListItem';

const ConversationList = () => {
	const conversationsState = useSelector(state => state.MessengerSlice.Conversations);
    return (
        <div className="ConversationList" >
         {
            conversationsState && conversationsState.map((item, ind)=>{
                 return(
                     <ConversationListItem key={ind} conversation={item}/>
                 )
             })
         }
        </div>
    )
}
export default ConversationList;