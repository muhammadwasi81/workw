import { Button, Image, Tag } from "antd";
import React, { useContext, useState } from "react";
import UserInfo from "../../../../sharedComponents/UserShortInfo/UserInfo";
import SublineDesigWithTime from "../../../../sharedComponents/UserShortInfo/SubLine/DesigWithTime";
import StatusTag from "../../../../sharedComponents/Tag/StatusTag";
import moment from "moment";
import {
  ItemContent,
  ItemHeader,
  SingleItem,
} from "../../../../sharedComponents/Card/CardStyle";
import Avatar from "../../../../sharedComponents/Avatar/avatar";
import { useDispatch } from "react-redux";
import { data } from "jquery";
// import "./style/reward.css";


function ListItem({item, onClick, id}) {

  const {
    creator,
    firstName,
    lastName,
    email,
    phone,
    description,
    image = "http://localhost:3000/static/media/rewardIcon.1872d27791f08290da2b85977f16cf07.svg",
    // image = images,
    category,
    members = [],
    approvers = [],
    status,
    referenceNo,
    createDate,
    path,
  } = item ? item : "";

  console.log(item, "ITEM")

//   const localTime = moment
//     .utc(createDate)
//     .local()
//     .format();
  return (
    <>
      <SingleItem onClick={onClick}>
        <div className="" id={id}></div>
        <ItemHeader>
          <div className="left">
            <UserInfo
            //   avatarSrc={creator?.image}
              name={"CREATOR NAME"}
              Subline={
                <SublineDesigWithTime
                //   designation={creator?.designation ? creator?.designation : ""}
                //   time={moment(localTime).fromNow()}
                />
              }
            />
          </div>
          <div className="right">
            {/* <Tag className="IdTag">{referenceNo && referenceNo}</Tag> */}
            {/* <StatusTag status={status && status}></StatusTag> */}
            <Button className="ThemeBtn">Resend Email</Button>
          </div>
        </ItemHeader>
        <ItemContent className="flex">
          <div className="description">
            <p>{"description"}</p>
          </div>
          <div
            className=" ml-auto attachmentBox"
            style={{ width: "65px", height: "60px" }}
          >
            {/* <Image
              preview={false}
              // width={60}
              // height={60}
              src={image === "" ? "" : image}
            /> */}
            {/* <Attachments
              data={[image]}
              key={{ data: image }}
              toShow={1}
              onClick={() => {}}
            /> */}
          </div>
        </ItemContent>
        <div className="cardSections">
          <div className="cardSectionItem">
            <div className="cardSection__title">
              {"First Name"}
            </div>
            <div className="cardSection__body">{firstName}</div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">{"Last Name"}</div>
            <div className="cardSection__body layout">{lastName}</div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">{"Email"}</div>
            <div className="cardSection__body layout">{email}</div>
          </div>
          </div>
      </SingleItem>
    </>
  );
}

export default ListItem;
