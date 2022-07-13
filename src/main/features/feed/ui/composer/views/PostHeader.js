import React from "react";
import { useSelector } from "react-redux";
import Avatar from "../../../../../sharedComponents/Avatar/avatarOLD";

const PostHeader = () => {
  const { tags } = useSelector(({ feedSlice }) => feedSlice.postCompose);
  const {
    userSlice: {
      user: { name, userImage },
    },
  } = useSelector((state) => state);
  console.log(userImage, name);
  return (
    <>
      <div className="avatar-wrapper">
        <Avatar
          width={40}
          height={40}
          src={userImage}
          name={name}
          round
        ></Avatar>
        {/* <img src={userImage} alt="" className="user-thumb" /> */}
        <div className="user-name">
          <h3>{name}</h3>
          {tags.length > 0 && (
            <>
              <span>with</span>
              <h3 className="tagged-users">{tags[0].name}</h3>
              <span>
                {tags.length >= 2 ? `and ${tags.length - 1} others` : ""}
              </span>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default PostHeader;
