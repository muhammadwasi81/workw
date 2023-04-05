import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import { ROUTES } from "../../../../../utils/routes";
import { TabbableContainer } from "../../../../layout/GridStyle";
import Header from "../../../../layout/header/index";
import { ApprovalStatus } from "../../../../sharedComponents/AppComponents/Approvals/enums";
import { ContBody } from "../../../../sharedComponents/AppComponents/MainFlexContainer";
import { getAllApproval } from "../../store/action";
import ApprovalDetail from "./detail";
import Listing from "./listing";
import { approvalsEnum } from "../../enum/enum";

export default function AllApprovals() {
  const defaultFilter = {
    pageNo: 0,
    search: "",
    status: [ApprovalStatus.InProcess],
  };
  const [filter, setFilter] = useState(defaultFilter);
  const [approvalDetailData, setApprovalDetailData] = useState({});
  const dispatch = useDispatch();

  const handleApprovalDetail = (item) => {
    setApprovalDetailData(item);
  };

  const handleTabChange = (tabIndex) => {
    tabIndex = Number(tabIndex);
    let status = ApprovalStatus.InProcess;
    switch (tabIndex) {
      case ApprovalStatus.InProcess:
        status = ApprovalStatus.InProcess;
        break;
      case ApprovalStatus.Approved:
        status = ApprovalStatus.Approved;
        break;
      case ApprovalStatus.Declined:
        status = ApprovalStatus.Declined;
        break;
      case ApprovalStatus.Hold:
        status = ApprovalStatus.Hold;
        break;
      default:
        break;
    }
    setFilter({
      ...filter,
      status: [status],
    });
  };

  useEffect(() => {
    let isMyApproval = true;
    dispatch(getAllApproval({ isMyApproval, filter }));
  }, [filter]);

  return (
    <TabbableContainer>
      <Header
        buttons={[]}
        items={[
          {
            name: "Approvals",
            approvalFilterItem: [1],
            to: ROUTES.APPROVALS.DEFAULT,
          },
          // {
          //   name: 'My Approval',
          //   renderButton: [2],
          //   to: ROUTES.APPROVALS.DEFAULT + "?myApproval",
          // },
        ]}
        backButton={false}
      />

      <ContBody>
        <div className="flex ApprovalMainView gap-4 w-full">
          <div className="">
            <Listing
              handleApprovalDetail={handleApprovalDetail}
              handleTabChange={handleTabChange}
              tabFilter={filter}
              isDetail={true}

              // handleRefresh={handleRefresh}
            />
          </div>
          <div className="flex-1">
            <ApprovalDetail approvalDetailData={approvalDetailData} />
          </div>
        </div>
      </ContBody>
    </TabbableContainer>
  );
}
