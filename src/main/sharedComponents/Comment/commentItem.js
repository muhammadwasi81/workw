import React, { useState } from "react";
import Avatar from "../Avatar/avatarOLD";
import "./style.css";
import DotesIcon from "./assets/dotes.svg";
import CommentComposer from "./Composer";

const CommentItem = (props) => {
  let {
    id,
    isReply = false,
    creator,
    commentTime = "",
    content = "",
    youLikeType = 0,
    likeCounter = 0,
    handleLike,
  } = props;
  let { name, image, designation } = creator;
  const [openComposer, setOpenComposer] = useState(false);

  return (
    <div className={"CommentItem " + (isReply ? "ReplyComment" : "")}>
      <div>
        <Avatar src={image} name={name} size={35} round={true} />
      </div>
      <div style={{ flex: "1" }}>
        <div className="CommentBubble">
          <div className="CommentHeader">
            <div className="CommentHeaderDet">
              <div className="name">{name}</div>
              <div className="designation">{designation}</div>
            </div>
            <div className="CommentHeaderIcon">
              <img src={DotesIcon} alt="" />
              <span className="time">{commentTime}</span>
            </div>
          </div>

          <div>{content}</div>
        </div>

        <div className="likeReplyCont">
          <div onClick={() => handleLike(id)}>Like</div>
          <div onClick={() => setOpenComposer(!openComposer)}>Reply</div>
        </div>
        <div>{openComposer && <CommentComposer parentId={id} />}</div>
      </div>
    </div>
  );
};
export default CommentItem;
