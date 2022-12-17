import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import { ApprovalStatus } from "../../../../sharedComponents/AppComponents/Approvals/enums";
import { saveApprovalsRemarks } from "../../../../sharedComponents/AppComponents/Approvals/services";
import { getAllApproval } from "../../store/action";

export default function ApprovalActions({ item }) {
  const dispatch = useDispatch();
  const createRemark = async (status) => {
    const remarks = {
      approvalId: item.id,
      remark: "",
      module: item.module,
      status: status,
      type: item.approverType,
      attachments: [],
    };

    const remark = await saveApprovalsRemarks(remarks);
    if (remark) {
      dispatch(getAllApproval({}))
    }
  };
  return (
    <div className="approval_item_status">
      <div
        className="accept"
        onClick={() => createRemark(ApprovalStatus.Approved)}
      >
        Accept
      </div>
      <div
        className="decline"
        onClick={() => createRemark(ApprovalStatus.Declined)}
      >
        Decline
      </div>
      <div className="hold" onClick={() => createRemark(ApprovalStatus.Hold)}>
        Hold
      </div>
    </div>
  );
}
