import React from "react";
import Avatar from "../../../Avatar/avatarOLD";
import { statusEnum } from "../enums";

function ApprovalComment({ type = "Approvers", status = 1 }) {
  const { label, color } = statusEnum[type][status - 1];
  return (
    <>
      <div className="comment">
        <div className="comment__header">
          <Avatar size={40} round width={"30px"} height={"30px"} />
        </div>
        <div className="comment__body">
          <h6>Muhammad Kamran</h6>
          <span> 1hr ago</span>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum. s
          </p>
          <span style={{ color }}>{label}</span>
        </div>
      </div>
    </>
  );
}

export default ApprovalComment;
