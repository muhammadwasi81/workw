import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import { ApprovalStatus } from "../../../../sharedComponents/AppComponents/Approvals/enums";
import { saveApprovalsRemarks } from "../../../../sharedComponents/AppComponents/Approvals/services";
import { getAllApproval } from "../../store/action";

export default function ApprovalActions({ item }) {
  const dispatch = useDispatch();
  const defaultFilter = {
    pageNo: 0,
    search: "",
    status: [1]
  }
  const createRemark = async (e, status) => {
    e.preventDefault();
    e.stopPropagation();
    const remarks = {
      approvalId: item.id,
      remark: "",
      module: item.module,
      status: status,
      type: item.approverType,
      attachments: []
    };

    const remark = await saveApprovalsRemarks(remarks);
    if (remark) {
      dispatch(getAllApproval(defaultFilter))
    }
  };
  return (
    <div className="approval_item_status">
      <div
        className="accept"
        onClick={(e) => createRemark(e, ApprovalStatus.Approved)}>
        Accept
      </div>
      <div
        className="decline"
        onClick={(e) => createRemark(e, ApprovalStatus.Declined)}>
        Decline
      </div>
      <div
        className="hold"
        onClick={(e) => createRemark(e, ApprovalStatus.Hold)}>
        Hold
      </div>
    </div>
  );
}
