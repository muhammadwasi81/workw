import { Tag } from "antd";
import React, { useContext, useEffect } from "react";
import UserInfo from "../../../../sharedComponents/UserShortInfo/UserInfo";
import SublineDesigWithTime from "../../../../sharedComponents/UserShortInfo/SubLine/DesigWithTime";
import StatusTag from "../../../../sharedComponents/Tag/StatusTag";
import moment from "moment";
import { ItemHeader, SingleItem } from "../../../../sharedComponents/Card/CardStyle";
import { useDispatch } from "react-redux";
import Avatar from "../../../../sharedComponents/Avatar/avatar";
import { useSelector } from "react-redux";
// import AllowanceDetail from "./allowanceDetail";
import RemarksApproval from "../../../../sharedComponents/AppComponents/Approvals/view";
import { ApprovalsModule } from "../../../../sharedComponents/AppComponents/Approvals/enums";
import EmployeesDetail from "./EmployeesDetail";

function DetailDetailCard(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    // if (props.id)
    //   dispatch(getEmployeeSalaryDetail(props.id))
  }, [props.id])

  const payrollDetail = useSelector((state) => state.payrollSlice.payrollDetail);
  if (!payrollDetail) return <></>
  console.log(payrollDetail)
  const {
    creator,
    description,
    approvers = [{}],
    status,
    referenceNo,
    createDate = moment(),
    total,
    disperseDate,
    month,
    year,
    details,
    id
  } = payrollDetail;
  return (
    <>
      <SingleItem onClick={() => props.onClick(id)}>
        <ItemHeader>
          <div className="left">
            <UserInfo
              avatarSrc={creator.image}
              name={creator.name}
              Subline={<SublineDesigWithTime designation={creator.designation ? creator.designation : ""} time={moment(createDate).fromNow()} />}
            />
          </div>
          <div className="right">
            <Tag className="IdTag">{referenceNo}</Tag>
            <StatusTag status={status}></StatusTag>
          </div>
        </ItemHeader>
        <div className="description w-full pt-3 pb-5">
          <p>{description}</p>
        </div>

        <div className="cardSections">
          <div className="cardSectionItem">
            <div className="cardSection__title">Employees</div>
            <div className="cardSection__body">
              <Avatar
                isAvatarGroup={true}
                heading={"approvers"}
                membersData={details.map((item) => ({ approver: item.user }))}
              />
            </div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">Disperse Date</div>
            <div className="cardSection__body">{moment().format("MMM Do YYYY")}</div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">Month</div>
            <div className="cardSection__body">{moment(month, 'M').format('MMMM')}</div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">Year</div>
            <div className="cardSection__body">{moment(year, 'Y').format('YYYY')}</div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">Total Amount</div>
            <div className="cardSection__body">{total}</div>
          </div>
          </div>
        <EmployeesDetail details={details}/>
        <RemarksApproval data={approvers} title="Approvals" module={ApprovalsModule.PayrollApproval} onStatusChanged={() => { }} />
      </SingleItem>
    </>
  );
}

export default DetailDetailCard;
