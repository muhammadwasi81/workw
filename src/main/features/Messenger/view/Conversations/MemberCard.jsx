import React, { useEffect, useState } from "react";
import Avatar from "../../../../sharedComponents/Avatar/avatar";
import checkIcon from "../../../../../content/NewContent/Messenger/check-outline.svg";
import { CloseOutlined } from "@ant-design/icons";
function MemberCard({ id, name, designation, image, onMember, crossIcon, isChecked }) {
  const [checked, setChecked] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    if (isClicked) {
      setIsClicked(!isClicked);
      onMember({ id, name, designation, image, status: checked });
    }
    return () => {
      setChecked(false);
      setIsClicked(false);
    };
  }, [checked]);

  return (
    <div
      className="memberCard"
      onClick={() => {
        setChecked(!checked);
        setIsClicked(!isClicked);
      }}>
      <div className="memberCard__header">
        <Avatar width={"2.2rem"} height={"2.2rem"} round src={image}></Avatar>
      </div>
      <div className="memberCard__body">
        <p>{name}</p>
        <p>{designation}</p>
      </div>
      <div className="memberCard__footer">
        {crossIcon ? (
          <CloseOutlined />
        ) : (
          <div className={`radio ${isChecked ? "checked" : ""}`}>{isChecked && <img alt={checkIcon} src={checkIcon} />}</div>
        )}
      </div>
    </div>
  );
}

export default MemberCard;
