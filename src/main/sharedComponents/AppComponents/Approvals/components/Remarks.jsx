import React from "react";
import ApprovalComment from "./ApprovalComment";
function Remarks() {
  return (
    <div className="remarks">
      {/* <div className="remarks__header">
        <h5>Remarks</h5>
      </div> */}
      <div className="remarks__body">
        <ApprovalComment />
      </div>
    </div>
  );
}

export default Remarks;
