import React from "react";
import { ApprovalStatus } from "../enums";

function RemarkStatus({ onCurrentStatus }) {
  return (
    <ul className="list">
      <div
        className="list__item"
        onClick={() => onCurrentStatus(ApprovalStatus.InProcess)}
      >
        In Process
      </div>

      <div
        className="list__item"
        onClick={() => onCurrentStatus(ApprovalStatus.Approved)}
      >
        Approve
      </div>

      <div
        className="list__item"
        onClick={() => onCurrentStatus(ApprovalStatus.Declined)}
      >
        Decline
      </div>

      <div
        className="list__item"
        onClick={() => onCurrentStatus(ApprovalStatus.Hold)}
      >
        Hold
      </div>
    </ul>
  );
}

export default RemarkStatus;
