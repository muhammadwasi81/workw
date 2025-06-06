import { Button, Image, Tag, Skeleton } from "antd";
import React, { useContext, useEffect } from "react";
import UserInfo from "../../../../sharedComponents/UserShortInfo/UserInfo";
import SublineDesigWithTime from "../../../../sharedComponents/UserShortInfo/SubLine/DesigWithTime";
import StatusTag from "../../../../sharedComponents/Tag/StatusTag";
// import Avatar from "../../../../sharedComponents/Avatar/avatar";
import RewardDefaultIcon from "../../../../../content/svg/menu/rewardIcon.svg";
import moment from "moment";
import {
  ItemContent,
  ItemHeader,
  SingleItem,
} from "../../../../sharedComponents/Card/CardStyle";
import { useDispatch } from "react-redux";
import Avatar from "../../../../sharedComponents/Avatar/avatar";
import { getEmployeeSalaryDetail } from "../../store/actions";
import { useSelector } from "react-redux";
import AllowanceDetail from "./allowanceDetail";
import RemarksApproval from "../../../../sharedComponents/AppComponents/Approvals/view";
import { ApprovalsModule } from "../../../../sharedComponents/AppComponents/Approvals/enums";
import { salaryDictionaryList } from "../../localization/index";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";

function SalaryDetailCard(props) {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { salaryDictionary } = salaryDictionaryList[userLanguage];
  const { salaryFor, EffectiveDate, BasicSalary, Approvals } = salaryDictionary;
  const dispatch = useDispatch();
  useEffect(() => {
    if (props.id) dispatch(getEmployeeSalaryDetail(props.id));
  }, [props.id]);

  const salaryDetail = useSelector((state) => state.salarySlice.salaryDetail);
  const { loadingData } = useSelector((state) => state.salarySlice);
  if (!salaryDetail) return <></>;

  const {
    creator,
    basicSalary,
    details,
    description = "Salary Description here",
    approvers = [{}],
    status = 1,
    referenceNo = "SAR-10001",
    createDate = moment(),
    effectiveDate = moment(),
    user,
  } = salaryDetail;
  console.log(salaryDetail, "salaryDetail");

  if (loadingData) return <Skeleton />;

  return (
    <>
      <SingleItem onClick={props.onClick}>
        <ItemHeader>
          <div className="left">
            <UserInfo
              avatarSrc={creator.image}
              name={creator.name}
              status={creator.userActiveStatus}
              Subline={
                <SublineDesigWithTime
                  designation={creator.designation ? creator.designation : ""}
                  time={moment
                    .utc(createDate)
                    .local()
                    .fromNow()}
                />
              }
            />
          </div>
          <div className="right">
            <Tag className="IdTag">{referenceNo}</Tag>
            <StatusTag status={status}></StatusTag>
          </div>
        </ItemHeader>
        <div className="description w-full pt-3 pb-5 h-[100px]">
          {description.length > 0 ? (
            <p>{description}</p>
          ) : (
            <p> No description </p>
          )}
        </div>

        <div className="cardSections">
          <div className="cardSectionItem">
            <div className="cardSection__title">{salaryFor}</div>
            <div className="cardSection__body">{user.name}</div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">{EffectiveDate}</div>
            <div className="cardSection__body">
              {moment(effectiveDate).format("Do MMM YY")}
            </div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">{BasicSalary}</div>
            <div className="cardSection__body">{basicSalary}</div>
          </div>
        </div>

        <AllowanceDetail details={details} />

        <RemarksApproval
          data={approvers}
          title={Approvals}
          reference={salaryDetail.id}
          module={ApprovalsModule.SalaryApproval}
          onStatusChanged={() => {}}
        />
      </SingleItem>
    </>
  );
}

export default SalaryDetailCard;
