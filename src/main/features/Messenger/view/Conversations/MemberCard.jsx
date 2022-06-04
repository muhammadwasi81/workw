import React, { useEffect, useState } from "react";
import Avatar from "../../../../sharedComponents/Avatar/avatar";
import checkIcon from "../../../../../content/NewContent/Messenger/check-outline.svg";
import { CloseOutlined } from "@ant-design/icons";
function MemberCard({
  id,
  name,
  designation,
  image,
  onMember,
  isChecked,
  extraClassName,
}) {
  const [checked, setChecked] = useState(false);

  return (
    <div
      className={`memberCard ${extraClassName && extraClassName}`}
      onClick={() => {
        setChecked(!checked);
        onMember({ id, name, designation, image });
      }}
      s
    >
      <div className="memberCard__header">
        <Avatar width={"2.2rem"} height={"2.2rem"} round src={image}></Avatar>
      </div>
      <div className="memberCard__body">
        <p>{name}</p>
        <p>{designation}</p>
      </div>
      <div className="memberCard__footer">
        <div className={`radio ${isChecked ? "checked" : ""}`}>
          {isChecked && <CloseOutlined />}
        </div>
      </div>
    </div>
  );
}

export default MemberCard;
