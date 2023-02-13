import { Image, Tag } from "antd";
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
import { useEffect } from "react";
// import Avatar from "../../../../sharedComponents/Avatar/avatar";
// import { useDispatch } from "react-redux";
// import { data } from "jquery";
// import Attachments from "../../travel/view/UI/Attachments";
// import "./style/reward.css";


function ListItem({item, onClick, id}) {

  const {
    firstName,
    lastName,
    email,
    title,
  } = item ? item : "";

  // const localTime = moment
  //   .utc(createDate)
  //   .local()
  //   .format();
  return (
    <>
      <SingleItem onClick={onClick}>
        <div className="" id={id}></div>
        <ItemHeader>
          <div className="left">
            <UserInfo
              // avatarSrc={creator?.image}
              name={title}
              Subline={
                <SublineDesigWithTime
                  designation={email}
            //      time={moment(localTime).fromNow()}
                />
              }
            />
          </div>
          <div className="right">
            <button 
              className="ThemeBtn" 
              style={{
                paddingLeft: '16px',
                paddingRight: '16px',
                paddingTop: '5px',
                paddingBottom: '5px'
                }}>
                  Resend
            </button>
          </div>
        </ItemHeader>
        <ItemContent className="flex"></ItemContent>
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
        </div>
      </SingleItem>
    </>
  );
}

export default ListItem;
