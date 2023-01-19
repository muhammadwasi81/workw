import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import { ROUTES } from '../../../../../utils/routes';
import { TabbableContainer } from '../../../../layout/GridStyle';
import Header from '../../../../layout/header/index';
import { ApprovalStatus } from '../../../../sharedComponents/AppComponents/Approvals/enums';
import { ContBody } from '../../../../sharedComponents/AppComponents/MainFlexContainer';
import { getAllApproval } from '../../store/action';
import ApprovalDetail from './detail';
import Listing from './listing';

export default function AllApprovals() {
  const defaultFilter = {
    pageNo: 0,
    search: '',
    status: [1],
  };
  const [filter, setFilter] = useState(defaultFilter);
  const [approvalDetailData, setApprovalDetailData] = useState({});
  const dispatch = useDispatch();

  const handleApprovalDetail = (item) => {
    setApprovalDetailData(item);
  };
  const handleRefresh = (e) => {
    console.log('refresh');
    e.preventDefault();
    e.stopPropagation();
    let isMyApproval = true;
    dispatch(getAllApproval({ isMyApproval, filter }));
  };
  const handleTabChange = (tabIndex) => {
    tabIndex = Number(tabIndex);
    let status = ApprovalStatus.InProcess;
    switch (tabIndex) {
      case 1:
        status = ApprovalStatus.InProcess;
        break;
      case 2:
        status = ApprovalStatus.Approved;
        break;
      case 3:
        status = ApprovalStatus.Declined;
        break;
      case 4:
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
  console.log(useSearchParams(), "useParams()")
  return (
    <TabbableContainer>
      <Header
        buttons={[]}
        items={[
          {
            name: 'Approvals',
            renderButton: [1],
            to: ROUTES.APPROVALS.DEFAULT,
          },
          {
            name: 'My Approval',
            renderButton: [2],
            to: ROUTES.APPROVALS.DEFAULT + "?myApproval",
          },
        ]}
        backButton={false}
      />

      <ContBody>
        <div className="flex ApprovalMainView gap-4 w-full">
          <div className="">
            <Listing
              handleApprovalDetail={handleApprovalDetail}
              handleTabChange={handleTabChange}
              handleRefresh={handleRefresh} 
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
