import React, { useEffect, useState } from "react";
import Avatar from "../../../../sharedComponents/Avatar/avatarOLD";
import checkIcon from "../../../../../content/NewContent/Messenger/check-outline.svg";
import { CloseOutlined } from "@ant-design/icons";
function MemberCard({
 item,
  onMemberSelect,
  onMemberRemove,
  isChecked,
  extraClassName,
}) {

  return (
    <div
      className={`memberCard ${extraClassName && extraClassName} px-5`}
      onClick={() => {
        isChecked ? onMemberRemove(item) :  onMemberSelect(item);
      }}>
      <div className="memberCard__header">
        <Avatar 
        src={item.image}
        name={item.name}
        width={"2.2rem"} 
        height={"2.2rem"} 
        round 
         />
      </div>
      <div className="memberCard__body">
        <p>{item.name}</p>
        <p>{item.designation}</p>
      </div>
      <div className="memberCard__footer">
        <div className={`radio ${isChecked ? "checked" : ""}`}>
         
          {/* {isChecked && <CloseOutlined />} */}
          {isChecked && <img src={checkIcon}/> }
        </div>
      </div>
    </div>
  );
}

export default MemberCard;
