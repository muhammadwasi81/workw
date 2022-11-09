import moment from "moment";
import React from "react";
import { renderTitleWithMentions } from "../../../utils/base";
import Avatar from "../Avatar/avatarOLD";
import DotesIcon from "./assets/dotes.svg";
function CommentBubble({ user, content, mentionedUser, date }) {
  const { name, designation = "", userImage:image="" } = user;
  let ts = moment.utc(date);
  ts.local().format("D-MMM-Y");
  return (
    <div style={{ display: "flex", width: "100%" }}>
      <Avatar src={image} name={name} size={30} round={true} />
      <div className="CommentBubble">
        <div className="CommentHeader">
          <div className="CommentHeaderDet">
            <div className="name">{name}</div>
            <div className="designation">{designation}</div>
          </div>
          <div className="CommentHeaderIcon">
            <img src={DotesIcon} alt="" />
            <span className="time">{moment(ts).fromNow()}</span>
          </div>
        </div>

        <p
          dangerouslySetInnerHTML={{
            __html: renderTitleWithMentions(content, mentionedUser),
          }}
        ></p>
      </div>
    </div>
  );
}

export default CommentBubble;
