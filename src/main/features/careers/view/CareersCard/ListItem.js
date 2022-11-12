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
import CardProfileTopView from "../../../travel/view/ListView/CardProfileTopView";

function ListItem({ item, onClick, onClickMyCareer }) {
  // console.log(item, "description");
  const {
    jobTypeId,
    createDate,
    status,
    designation,
    image,
    minSalary,
    maxSalary,
    experience,
    endDate,
    city,
    country,
    referenceNo,
  } = item;
  const { currentTab } = useSelector((state) => state.careerSlice);

  // console.log("items", item);

  return (
    <>
      <SingleItem onClick={onClick} className="cursor-pointer">
        <CardProfileTopView
          profileImgSrc={
            item.creator && item.creator.image.length > 0
              ? item.creator.image
              : "https://joeschmoe.io/api/v1/random"
          }
          createDate={item.createDate}
          isPublic={true}
          name={item.creator && item.creator.name}
          destination={
            item.creator && item.creator.designation
              ? item.creator.designation
              : "Not Designated"
          }
          refNo={referenceNo}
          status={item.status}
          profileImgSize={40}
        />
        <ItemContent className="!h-[100px] !max-h-[100px]">
          <div className="font-bold text-[14px] text-primary-color">
            {/* {" "}
            React Js Developer */}

            {designation}
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
          {/* <div className="careerFooterText flex gap-x-2 items-baseline">
            <FieldTimeOutlined />
            {moment(createDate).fromNow()}
          </div> */}
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
