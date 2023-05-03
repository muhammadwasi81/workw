import { Tag } from "antd";
import React, { useContext, useEffect } from "react";
import UserInfo from "../../../../sharedComponents/UserShortInfo/UserInfo";
import SublineDesigWithTime from "../../../../sharedComponents/UserShortInfo/SubLine/DesigWithTime";
import StatusTag from "../../../../sharedComponents/Tag/StatusTag";
import moment from "moment";
import {
  ItemHeader,
  SingleItem,
} from "../../../../sharedComponents/Card/CardStyle";
import { useDispatch } from "react-redux";
import Avatar from "../../../../sharedComponents/Avatar/avatar";
import { useSelector } from "react-redux";
// import AllowanceDetail from "./allowanceDetail";
import RemarksApproval from "../../../../sharedComponents/AppComponents/Approvals/view";
import { ApprovalsModule } from "../../../../sharedComponents/AppComponents/Approvals/enums";
import EmployeesDetail from "./EmployeesDetail";
import { payrollDictionaryList } from "../../localization/index";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
// import { getEmployeeSalaryDetail } from "../../../salary/store/actions";

function PayrolDetailCard(props) {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { payrollDictionary, Direction } = payrollDictionaryList[userLanguage];
  const dispatch = useDispatch();
  const { id } = props;
  useEffect(() => {
    // dispatch(getEmployeeSalaryDetail(id));
  }, [id]);

  const payrollDetail = useSelector(
    (state) => state.payrollSlice.payrollDetail
  );

  return (
    <>
      <SingleItem>
        <ItemHeader>
          <div className="left">
            <UserInfo
              avatarSrc={payrollDetail?.creator.image}
              name={payrollDetail?.creator.name}
              status={payrollDetail?.creator.userActiveStatus}
              Subline={
                <SublineDesigWithTime
                  designation={
                    payrollDetail?.creator.designation
                      ? payrollDetail?.creator.designation
                      : ""
                  }
                  time={moment(payrollDetail?.createDate).fromNow()}
                />
              }
            />
          </div>
          <div className="right">
            <Tag className="IdTag">{payrollDetail?.referenceNo}</Tag>
            <StatusTag status={payrollDetail?.status}></StatusTag>
          </div>
        </ItemHeader>
        <div className="description w-full pt-3 pb-5">
          <p>{payrollDetail?.description}</p>
        </div>

        <div className="cardSections">
          <div className="cardSectionItem">
            <div className="cardSection__title">
              {payrollDictionary.employee}
            </div>
            <div className="cardSection__body">
              <Avatar
                isAvatarGroup={true}
                heading={"approvers"}
                membersData={payrollDetail?.details.map((item) => ({
                  approver: item.user,
                }))}
              />
            </div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">
              {" "}
              {payrollDictionary.dispereseDate}
            </div>
            <div className="cardSection__body">
              {moment().format("MMM Do YYYY")}
            </div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title"> {payrollDictionary.month}</div>
            <div className="cardSection__body">
              {moment(payrollDetail?.month, "M").format("MMMM")}
            </div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">Year</div>
            <div className="cardSection__body">
              {moment(payrollDetail?.year, "Y").format("YYYY")}
            </div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">
              {" "}
              {payrollDictionary.totalAmount}
            </div>
            <div className="cardSection__body">{payrollDetail?.total}</div>
          </div>
        </div>
        <EmployeesDetail details={payrollDetail?.details} />
        <RemarksApproval
          data={payrollDetail?.approvers}
          title={payrollDictionary.approvals}
          module={ApprovalsModule.PayrollApproval}
          onStatusChanged={() => {}}
        />
      </SingleItem>
    </>
  );
}

export default PayrolDetailCard;
