import React from "react";
import { useSelector } from "react-redux";
import { ApprovalStatus } from "../../../../sharedComponents/AppComponents/Approvals/enums";
import Tab from "../../../../sharedComponents/Tab";
import ApprovalItem from "../SideBarApproval/approvalItem";

const panes = [
  {
    featureName: `In Progress`,
    content: <div></div>,
    featureId: 1,
  },
  {
    featureName: `Accepted`,
    content: <div></div>,
    featureId: 2,
  },
  {
    featureName: `Declined`,
    content: <div></div>,
    featureId: 3,
  },
  {
    featureName: `Hold`,
    content: <div></div>,
    featureId: 4,
  },
];

export default function Listing({ handleApprovalDetail, handleTabChange }) {
  const approvalList = useSelector((state) => state.approvalSlice.approvalList);

  return (
    <>
      <Tab canChangeRoute={true} panes={panes} onChange={handleTabChange} />
      <div className="overflow-scroll h-[85vh]">
        {approvalList.map((item) => (
          <ApprovalItem
            item={item}
            handleApprovalDetail={handleApprovalDetail}
          />
        ))}
      </div>
    </>
  );
}
