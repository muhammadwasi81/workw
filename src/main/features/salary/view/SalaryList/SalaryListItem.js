import { Button, Image, Tag } from "antd";
import React, { useContext } from "react";
import UserInfo from "../../../../sharedComponents/UserShortInfo/UserInfo";
import SublineDesigWithTime from "../../../../sharedComponents/UserShortInfo/SubLine/DesigWithTime";
import StatusTag from "../../../../sharedComponents/Tag/StatusTag";
// import Avatar from "../../../../sharedComponents/Avatar/avatar";
// import RewardDefaultIcon from "../../../../../content/svg/menu/rewardIcon.svg";
import moment from "moment";
import { ItemContent, ItemHeader, SingleItem } from "../../../../sharedComponents/Card/CardStyle";
import { useDispatch } from "react-redux";
import Avatar from "../../../../sharedComponents/Avatar/avatar";

import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
import {salaryDictionary} from "../../../salary/localization/index";

function SalaryListItem(props) {

  const { userLanguage } = useContext(LanguageChangeContext);
  const { salary_Dictionary } = salaryDictionary[userLanguage];

  const disptach = useDispatch();
  const {
    creator = {
      businessId: "cfe50d8d-7c47-4abb-9154-661daf129cec",
      designation: "",
      email: "owais@miletap.com",
      id: "77546782-aa7a-4984-9388-5fd044c0fb11",
      image: "https://58.65.211.234:4436/Resources\\cfe50d8d-7c47-4abb-9154-661daf129cec\\Images\\45f43115-c12f-4fc4-82ec-e570fbc13a70.jpeg",
      name: "Owais Shaikh",
      type: 1,
      userTypeId: 2
    },
    basicSalary,
    netSalary,
    description = "Salary Description here",
    approvers = [{}],
    status = 1,
    referenceNo = "SAR-10001",
    createDate = moment(),
    effectiveDate = moment(),
    id,
    user
  } = props.item;

  return (
    <>
      <SingleItem onClick={()=>props.onClick(id)}>
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
        <div className="description w-full pt-3 pb-5 h-[100px]">
          {description.length > 0 ?<p>{description}</p> :<p>{salary_Dictionary.NoDescription}</p>}  
        </div>

        <div className="cardSections">
          <div className="cardSectionItem">
            <div className="cardSection__title">{salary_Dictionary.SalaryFor}</div>      
            <div className="cardSection__body">{user.name}</div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">{salary_Dictionary. EffectiveDate}</div>     
            <div className="cardSection__body">{moment(effectiveDate).format("Do MMM YY")}</div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">{salary_Dictionary.BasicSalary}</div>           
            <div className="cardSection__body">{basicSalary}</div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">{salary_Dictionary.NetSalary}</div>             
            <div className="cardSection__body">{netSalary}</div>
          </div>
          <div className="cardSectionItem"> 
            <div className="cardSection__title">{salary_Dictionary.Approvers}</div>              
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

export default SalaryListItem;
