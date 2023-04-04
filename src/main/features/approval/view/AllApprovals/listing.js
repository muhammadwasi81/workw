import React from "react";
import { useSelector } from "react-redux";
import { ApprovalStatus } from "../../../../sharedComponents/AppComponents/Approvals/enums";
import Tab from "../../../../sharedComponents/Tab";
import ApprovalItem from "../SideBarApproval/approvalItem";
import { useDispatch } from "react-redux";
import RefreshIcon from "../../../../../content/NewContent/leadManager/svg/refresh.svg";
import { getAllApproval } from "../../store/action";
import { useState } from "react";

export default function Listing({
  handleApprovalDetail,
  handleTabChange,
  tabFilter,
  isDetail = false,
}) {
  const defaultFilter = {
    pageNo: 0,
    search: "",
    status: ApprovalStatus.InProcess,
  };
  const dispatch = useDispatch();
  let filter = tabFilter;
  const approvalList = useSelector((state) => state.approvalSlice.approvalList);

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

  const handleRefresh = (e) => {
    e.preventDefault();
    e.stopPropagation();
    let isMyApproval = true;
    dispatch(getAllApproval({ isMyApproval, filter }));
  };

  return (
    <>
      <Tab canChangeRoute={true} panes={panes} onChange={handleTabChange} />
      <div className="refresButton">
        <img
          src={RefreshIcon}
          alt="calender logo"
          loading="lazy"
          className="cursor-pointer m-auto"
          onClick={handleRefresh}
        />
      </div>
      <div className="overflow-scroll h-[85vh]">
        {approvalList && approvalList.length > 0 ? (
          approvalList.map((item) => (
            <ApprovalItem
              item={item}
              handleApprovalDetail={handleApprovalDetail}
              detail={isDetail}
            />
          ))
        ) : (
          <p className="noData">No data...</p>
        )}
      </div>
    </>
  );
}
