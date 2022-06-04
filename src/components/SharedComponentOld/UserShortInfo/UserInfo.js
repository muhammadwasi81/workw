import React from "react";
import Avatar from "../Avatar/avatar";
import "./style.css"

const UserInfo = (props) => {
    const {
        name,
        avatarSrc,
        Subline
    } = props
    return (
        <div className="userInfo" >
            <Avatar
                src={avatarSrc}
                className="addPostAvatar"
                name={name}
                width={44}
                height={44}
                round={true}
            />
            <div className="avatar-name">
                <div className="name">{name}</div>
              {
                 Subline
              }
            </div>
        </div>
    )
}
export default UserInfo;