import React from "react";
import {useSelector} from "react-redux";

const PostHeader = () => {
  const {tags} = useSelector(({feedSlice}) => feedSlice.postCompose);

  return (
    <>
      <div className="avatar-wrapper">
        <img
          src="https://konnect.im/upload/2021/3/5325454b-1c5d-40f1-b95d-df0fad2d4da9.jpeg"
          alt=""
          className="user-thumb"
        />
        <div className="user-name">
          <h3>Shoaib Raza</h3>
          {(tags.length > 0) && (
              <>
                <span>with</span>
                <h3 className="tagged-users">{tags[0].name}</h3>
                <span>{tags.length >= 2 ? `and ${tags.length - 1} others` : ""}</span>
              </>
          )}
        </div>
      </div>
    </>
  );
};

export default PostHeader;
