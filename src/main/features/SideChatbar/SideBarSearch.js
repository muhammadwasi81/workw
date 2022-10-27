import React from "react";
import searchIcon from "../../../content/NewContent/Sidebar/svg/search.svg";

export const SideBarSearch = () => {

  return (
    <div className="sideBarSearch" >
     <div className="chatSearchBoxHalf" >
       <img src={searchIcon} alt="" />
       <input placeholder="Search" />
     </div>
    </div>
  )
}
export default SideBarSearch;