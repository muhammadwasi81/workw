import moment from "moment";
import React from "react";
import Avatar from "../../../Avatar/avatarOLD";
import { statusEnum, statusObj } from "../enums";

function ApprovalComment({
  remarker,
  remark,
  type: typeNo = 1,
  status = 1,
  date,
}) {
  const type = statusObj[typeNo];
  const { label, color } = statusEnum[type][status - 1];
  const { name, image } = remarker;
  return (
    <>
      <div className="comment">
        <div className="comment__header">
          <Avatar src={image} size={40} round width={"30px"} height={"30px"} />
        </div>
        <div className="comment__body">
          <h6>{name}</h6>
          <span> {moment(date).fromNow()}</span>
          <p>{remark}</p>
          <span style={{ color }}>{label}</span>
        </div>
      </div>
    </>
  );
}

export default ApprovalComment;
