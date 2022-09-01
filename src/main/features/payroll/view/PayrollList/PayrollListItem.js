import { Avatar, Button, Image, Tag } from "antd";
import React, { useContext } from "react";
import UserInfo from "../../../../sharedComponents/UserShortInfo/UserInfo";
import SublineDesigWithTime from "../../../../sharedComponents/UserShortInfo/SubLine/DesigWithTime";
import StatusTag from "../../../../sharedComponents/Tag/StatusTag";
// import Avatar from "../../../../sharedComponents/Avatar/avatar";
import RewardDefaultIcon from "../../../../../content/svg/menu/rewardIcon.svg";
import moment from "moment";
import { ItemContent, ItemHeader, SingleItem } from "../../../../sharedComponents/Card/CardStyle";
import { useDispatch } from "react-redux";

function PayrollList(props) {
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
    name = "Salary Title Here",
    description = "Salary Description here",
    image = "http://localhost:3000/static/media/rewardIcon.1872d27791f08290da2b85977f16cf07.svg",
    reason = "not found",
    category = "Salary",
    members = [],
    approvers = [{}],
    status = 1,
    referenceNo = "SAR-10001",
    createDate = moment(),
  } = props.item;

  const handleCancel = (e, payload) => {
    e.preventDefault()
    e.stopPropagation();
    console.log(e, payload, "HELLOO!!! E");
  }

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
        <div className="description w-full pt-3 pb-5">
          <p>{description}</p>
        </div>






        <div className="cardSections">

          <div className="cardSectionItem">
            <div className="cardSection__title">Employees</div>
            <div className="cardSection__body">Syed Danish</div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">Disperse Date</div>
            <div className="cardSection__body">06-March-2020</div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">Month</div>
            <div className="cardSection__body">September</div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">Year</div>
            <div className="cardSection__body">2022</div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">Total Amount</div>
            <div className="cardSection__body">45,0000</div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">Approvers</div>
            <div className="cardSection__body">Syed Danish</div>
          </div>

        </div>

      </SingleItem>
    </>
  );
}

export default PayrollList;
