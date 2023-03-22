import React from "react";
import { useSelector } from "react-redux";
import SideBarListItem from "./SideBarListItem";

export const SideBarList = ({chatList }) => {
  return (
    <div className="sideBarList" >
       {
        chatList && chatList.map((item, index)=>{
           return(
            <SideBarListItem item={item} key={index}/>
           )
         })
       }
    </div>
  )
}

export default SideBarList;