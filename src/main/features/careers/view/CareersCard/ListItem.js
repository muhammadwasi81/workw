import React, { useState, useEffect } from "react";
import { FieldTimeOutlined } from "@ant-design/icons";
import moment from "moment";
import {
  ItemContent,
  ItemHeader,
  SingleItem,
} from "../../../../sharedComponents/Card/CardStyle";

import Avatar from "../../../../sharedComponents/Avatar/avatarOLD";
// import JobDetails from "../../DetailView/DetailComposer/JobDetails";
import { CareerStatusEnum, CareerLevelTypeEnum } from "../../utils/enums";
import { useDispatch, useSelector } from "react-redux";
import StatusTag from "../../../../sharedComponents/Tag/StatusTag";

function ListItem({ item, onClick, onClickMyCareer }) {
  // console.log(item, "description");
  const {
    jobTypeId,
    createDate,
    status,
    image,
    minSalary,
    maxSalary,
    experience,
    endDate,
    city,
    country,
  } = item;
  const { currentTab } = useSelector((state) => state.careerSlice);

  console.log("props", onClickMyCareer);

  return (
    <>
      <SingleItem onClick={onClick} className="cursor-pointer">
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
              {item.designation}
            </div>
          </div>
          <div>
            <StatusTag status={status} />
          </div>
        </ItemHeader>
        <ItemContent className="!h-[100px] !max-h-[100px]">
          <div className="font-bold text-[14px] text-primary-color">
            {/* {" "}
            React Js Developer */}

            {item.department}
          </div>
          <p className="careersDescShort">{item.description}</p>
        </ItemContent>

        <div className="flex justify-between">
          <div className="careerFooterText">
            {city}, {country} -{" "}
            {CareerLevelTypeEnum.map((item) => {
              if (item.value === jobTypeId) {
                return item.label;
              }
            })}
          </div>
          <div className="careerFooterText flex gap-x-2 items-baseline">
            <FieldTimeOutlined />
            {moment(createDate).fromNow()}
          </div>
          {/* <div className="careersDescShort">
            {CareerStatusEnum.map((item) => {
              if (item.value === status) {
                return item.label;
              }
            })}
          </div> */}
        </div>
      </SingleItem>
    </>
  );
}

export default ListItem;
