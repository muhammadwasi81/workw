import React from "react";
import ApprovalComment from "./ApprovalComment";
function Remarks({ remarker, status, type, remark, date }) {
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
        />
      </div>
    </div>
  );
}

export default Remarks;
