import React from "react";
import ApprovalComment from "./RemarkBubble";
function Remarks({ remarker, status, type, remark, date, attachments }) {
  return (
    <div className="remarks">
      {/* <div className="remarks__header">
        <h5>Remarks</h5>
      </div> */}
      <div className="remarks__body">
        <ApprovalComment
          remarker={remarker}
          status={status}
          type={type}
          remark={remark}
          date={date}
          attachments={attachments}
        />
      </div>
    </div>
  );
}

export default Remarks;
