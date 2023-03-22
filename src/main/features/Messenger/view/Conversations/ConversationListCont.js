import React from 'react';
import ConversationList from './ConversationList';
import ConversationListHead from './ConversationListHead';
import ConversationListSearch from './ConversationListSearch';

const ConversationListCont = () => {
    return (
        <div className="ConversationListCont" >
           <ConversationListHead />
           <ConversationListSearch />
           <ConversationList />
        </div>
    )
}
export default ConversationListCont;    