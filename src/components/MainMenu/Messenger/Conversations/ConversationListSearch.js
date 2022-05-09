import React from 'react';
import searchIcon from "../../../../content/NewContent/Sidebar/svg/search.svg";

const ConversationListSearch = () => {
    return (
        <div className="ConversationListSearch" >
         <div>
             <img src={searchIcon} alt="" />
         <input placeholder="Search" />
         </div>
        </div>
    )
}
export default ConversationListSearch;