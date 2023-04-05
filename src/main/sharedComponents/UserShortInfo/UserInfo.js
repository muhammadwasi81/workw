import React from "react";
import Avatar from "../Avatar/avatarOLD";
import "./style.css";

const UserInfo = (props) => {
  const { name, avatarSrc, status, Subline, nameStyle = {}, avatarSize = 44 } = props;
  console.log(status, "ONLINE STATUS !!")
  return (
    <div className="userInfo" style={{ display: "flex" }}>
      <Avatar 
        src={avatarSrc}
        className="addPostAvatar"
        name={name}
        width={avatarSize}
        height={avatarSize}
        round={true}
        status={status}
        />
      <div className="avatar-name" style={{ marginLeft: "4px" }}>
        <div className="name" style={{ ...nameStyle }} >{name}</div>
        {Subline}
      </div>
    </div>
  );
};
export default UserInfo;
