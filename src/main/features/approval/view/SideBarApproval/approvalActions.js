import React, { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { ApprovalStatus } from "../../../../sharedComponents/AppComponents/Approvals/enums";
import { saveApprovalsRemarks } from "../../../../sharedComponents/AppComponents/Approvals/services";
import { getAllApproval } from "../../store/action";
import ConfirmationRemarkModal from "../../../../sharedComponents/ConfirmationRemarkModal/ConfirmationRemarkModal";

export default function ApprovalActions({ item }) {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(ApprovalStatus.InProcess);

  console.log(currentStatus, "currentStatus");
  const defaultFilter = {
    pageNo: 0,
    search: "",
    status: [1],
  };
  const handleAction = (e, status) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(true);
    setCurrentStatus(status);
    console.log(status, "statusss");
  };
  const createRemark = async (status, remarksValue) => {
    const remarks = {
      approvalId: item.id,
      remark: remarksValue,
      module: item.module,
      status: status,
      type: item.approverType,
      attachments: [],
    };

    const remark = await saveApprovalsRemarks(remarks);
    if (remark) {
      // setIsOpen(true);
      dispatch(getAllApproval(defaultFilter));
    }
  };
  const onClose = () => {
    setIsOpen(false);
  };
  const onFinish = (values) => {
    let remarks = values.remarks;
    createRemark(currentStatus, remarks);
    setIsOpen(false);
  };
  return (
    <div className="approval_item_status">
      <div
        className="accept"
        onClick={(e) => handleAction(e, ApprovalStatus.Approved)}
      >
        Accept
      </div>
      <div
        className="decline"
        onClick={(e) => handleAction(e, ApprovalStatus.Declined)}
      >
        Decline
      </div>
      <div
        className="hold"
        onClick={(e) => handleAction(e, ApprovalStatus.Hold)}
      >
        Hold
      </div>
      <ConfirmationRemarkModal
        isOpen={isOpen}
        onCancel={onClose}
        onFinish={onFinish}
      />
    </div>
  );
}
