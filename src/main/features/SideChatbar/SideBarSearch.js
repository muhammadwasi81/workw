import React from "react";
import searchIcon from "../../../content/NewContent/Sidebar/svg/search.svg";

export const SideBarSearch = () => {

  return (
    <div className="sideBarSearch" >
     <div className="chatSearchBoxHalf" >
       <img src={searchIcon} alt="" />
       <div>Search</div>
     </div>
    </div>
  )
}
export default SideBarSearch;