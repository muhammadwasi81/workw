import React from "react";
import SideBarListItem from "./SideBarListItem";

export const SideBarList = ({chatList}) => {

  return (
    <div className="sideBarList" >
       {
         chatList.map((Item, index)=>{
           return(
            <SideBarListItem imgSrc={Item.src} key={index}/>
           )
         })
       }
    </div>
  )
}

export default SideBarList;