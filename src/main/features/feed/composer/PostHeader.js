import React from "react";

const postHeader = (props) => {
  const { userName, userIcon, shareWith } = props;

  return (
    <>
      <div className="avatar-wrapper">
        <img
          src="https://konnect.im/upload/2021/3/5325454b-1c5d-40f1-b95d-df0fad2d4da9.jpeg"
          alt=""
          className="user-thumb"
        />
        <div className="user-name">
          <h3>{userName}</h3>
          {(shareWith?.length > 0 && <span>with</span>) || ""}
          <h3 className="tagged-users">{shareWith?.[0]?.name}</h3>
          <span>
            {shareWith?.length >= 2
              ? `and ${shareWith?.length - 1} others`
              : ""}
          </span>
        </div>
      </div>
    </>
  );
};

export default postHeader;
