import React, { useState, useEffect } from "react";

import { Button, Image } from "antd";
import { FieldTimeOutlined } from "@ant-design/icons";
import UserInfo from "../../../../../sharedComponents/UserShortInfo/UserInfo";
import SublineDesigWithTime from "../../../../../sharedComponents/UserShortInfo/SubLine/DesigWithTime";
import { getNameForImage } from "../../../../../../utils/base";
import moment from "moment";
import {
  ItemContent,
  ItemHeader,
  SingleItem,
} from "../../../../../sharedComponents/Card/CardStyle";
import { Link } from "react-router-dom";
import Avatar from "../../../../../sharedComponents/Avatar/avatarOLD";
// import JobDetails from "../../DetailView/DetailComposer/JobDetails";
import { CareerStatusEnum, CareerLevelTypeEnum } from "../../../utils/enums";
import { useDispatch } from "react-redux";

function ListItem({ item, onClick }) {
  console.log(item, "description");
  const { jobTypeId, createDate } = item;
  return (
    <>
      <SingleItem onClick={onClick}>
        <ItemHeader className="ItemHeader">
          <div className="flex items-center gap-3">
            <Avatar
              src={item.creator?.image}
              className="addPostAvatar"
              name={item.creator?.name}
              width={40}
              height={40}
              round={true}
            />
            <div className="font-bold text-[15px] text-primary-color">
              {item.department}
            </div>
          </div>
        </ItemHeader>
        <ItemContent className="!h-[100px] !max-h-[100px]">
          <div className="font-bold text-[14px] text-primary-color">
            {/* {" "}
            React Js Developer */}
            {item.designation}
          </div>
          <p className="careersDescShort">{item.description}</p>
        </ItemContent>
        {/* <div>
          {item.city} 
          {item.country}
           {item.jobTypeId}
            
          {item.createDate}
        </div> */}
        <div className="flex justify-between">
          <div className="flex gap-x-8">
            <p className="careerFooterText">
              Karachi, Pakistan -{" "}
              {CareerLevelTypeEnum.map((item) => {
                if (item.value === jobTypeId) {
                  return item.label;
                }
              })}
            </p>
            <p className="careerFooterText flex gap-x-2 items-baseline">
              <FieldTimeOutlined />
              <p>{moment(createDate).fromNow()}</p>
            </p>
          </div>
          <p className="careersDescShort">
            {CareerStatusEnum.map((item) => {
              if (item.value === jobTypeId) {
                return item.label;
              }
            })}
          </p>
        </div>
      </SingleItem>
    </>
  );
}

export default ListItem;
