import React, { useState } from "react";
import Avatar from "../../../../../components/SharedComponent/Avatar/avatar";
import checkIcon from "../../../../../content/NewContent/Messenger/check-outline.svg";

function MemberCard({ id, name, designation, image, onMember, crossIcon }) {
  const [checked, setChecked] = useState(false);
  return (
    <div
      className="memberCard"
      onClick={() => {
        setChecked(!checked);
        onMember({ id, name, designation, image, status: checked });
      }}
    >
      <div className="memberCard__header">
        <Avatar width={"2.2rem"} height={"2.2rem"} round src={image}></Avatar>
      </div>
      <div className="memberCard__body">
        <p>{name}</p>
        <p>{designation}</p>
      </div>
      <div className="memberCard__footer">
        {crossIcon ? (
          "x"
        ) : (
          <div className={`radio ${checked ? "checked" : ""}`}>
            {checked && <img alt={checkIcon} src={checkIcon} />}
          </div>
        )}
      </div>
    </div>
  );
}

export default MemberCard;
