import { Button, Image, Tag } from "antd";
import React, { useContext } from "react";
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
import { payrollDictionaryList } from "../../localization/index";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";

function PayrollList(props) {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { payrollDictionary, Direction } = payrollDictionaryList[userLanguage];
  const disptach = useDispatch();
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
    id,
  } = props.item;

  return (
    <>
      <SingleItem onClick={() => props.onClick(id)}>
        <ItemHeader>
          <div className="left">
            <UserInfo
              avatarSrc={creator.image}
              name={creator.name}
              Subline={
                <SublineDesigWithTime
                  designation={creator.designation ? creator.designation : ""}
                  time={moment(createDate).fromNow()}
                />
              }
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
            <div className="cardSection__title">
              {payrollDictionary.employee}
            </div>
            <div className="cardSection__body">
              <Avatar
                isAvatarGroup={true}
                heading={"approvers"}
                membersData={details.map((item) => ({ approver: item.user }))}
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
            <div className="cardSection__title">{payrollDictionary.month}</div>
            <div className="cardSection__body">
              {moment(month, "M").format("MMMM")}
            </div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">{payrollDictionary.year}</div>
            <div className="cardSection__body">
              {moment(year, "Y").format("YYYY")}
            </div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">
              {payrollDictionary.totalAmount}
            </div>
            <div className="cardSection__body">{total}</div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">
              {" "}
              {payrollDictionary.approvers}
            </div>
            <div className="cardSection__body">
              <Avatar
                isAvatarGroup={true}
                heading={"approvers"}
                membersData={approvers ? approvers : []}
              />
            </div>
          </div>
        </div>
      </SingleItem>
    </>
  );
}

export default PayrollList;
