import { Button, Image, Tag } from "antd";
import React, { useContext } from "react";
import UserInfo from "../../../../sharedComponents/UserShortInfo/UserInfo";
import SublineDesigWithTime from "../../../../sharedComponents/UserShortInfo/SubLine/DesigWithTime";
import StatusTag from "../../../../sharedComponents/Tag/StatusTag";
// import Avatar from "../../../../sharedComponents/Avatar/avatar";
import RewardDefaultIcon from "../../../../../content/svg/menu/rewardIcon.svg";
import moment from "moment";
import { ItemContent, ItemHeader, SingleItem } from "../../../../sharedComponents/Card/CardStyle";
import { useDispatch } from "react-redux";
import Avatar from "../../../../sharedComponents/Avatar/avatar";

function SalaryListItem(props) {
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
    details,
    netSalary,
    description = "Salary Description here",
    approvers = [{}],
    status = 1,
    referenceNo = "SAR-10001",
    createDate = moment(),
    effectiveDate = moment(),
  } = props.item;


  return (
    <>
      <SingleItem onClick={props.onClick}>
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
          <p>{description.length > 0 ? description : "No description"}</p>
          {description.length > 0 ?<p>description</p> :<p> No description </p>}
        </div>

        <div className="cardSections">
          <div className="cardSectionItem">
            <div className="cardSection__title">Salary For</div>
            <div className="cardSection__body">Syed Danish</div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">Effective Date</div>
            <div className="cardSection__body">{moment(effectiveDate).format("Do MMM YY")}</div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">Basic Salary</div>
            <div className="cardSection__body">{basicSalary}</div>
          </div>
          {/* <div className="cardSectionItem">
            <div className="cardSection__title">Allowances</div>
            <div className="cardSection__body">45,0000</div>
          </div> */}
          <div className="cardSectionItem">
            <div className="cardSection__title">Net Salary</div>
            <div className="cardSection__body">{netSalary}</div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">Approvers</div>
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
