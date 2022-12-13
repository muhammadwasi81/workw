import React, { useState, useEffect, useContext } from "react";

import { Button, Image } from "antd";
import { FieldTimeOutlined } from "@ant-design/icons";
import UserInfo from "../../../../../sharedComponents/UserShortInfo/UserInfo";
import SublineDesigWithTime from "../../../../../sharedComponents/UserShortInfo/SubLine/DesigWithTime";
import { getNameForImage, getEnumValue } from "../../../../../../utils/base";
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
import { useDispatch, useSelector } from "react-redux";
import { LanguageChangeContext } from "../../../../../../utils/localization/localContext/LocalContext";
import { CareerDictionary } from "../../../localization/index";
function ListItem({ item, onClick, onClickMyCareer }) {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { CareerDictionaryList, Direction } = CareerDictionary[userLanguage];
  const { labels } = CareerDictionaryList;
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
      {currentTab === "careers" || currentTab === "forApprovals" ? (
        <SingleItem onClick={onClick}>
          <ItemHeader className="ItemHeader">
            <div className="flex items-center gap-3">
              {/* {image.length > 1 && (
              <Avatar
                src={item.creator?.image}
                className="addPostAvatar"
                name={item.creator?.name}
                width={40}
                height={40}
                round={true}
              />
            )} */}
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
          </ItemHeader>
          <ItemContent className="!h-[100px] !max-h-[100px]">
            <div className="font-bold text-[14px] text-primary-color">
              {/* {" "}
            React Js Developer */}

              {item.department}
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
                {city}, {country} -{" "}
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
                if (item.value === status) {
                  return item.label;
                }
              })}
            </p>
          </div>
        </SingleItem>
      ) : (
        <SingleItem onClick={onClickMyCareer}>
          <ItemHeader className="ItemHeader">
            <div className="flex items-center gap-3">
              {/* {image.length > 1 && (
              <Avatar
                src={item.creator?.image}
                className="addPostAvatar"
                name={item.creator?.name}
                width={40}
                height={40}
                round={true}
              />
            )} */}
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
          </ItemHeader>
          <ItemContent className="!h-[100px] !max-h-[100px]">
            <div className="font-bold text-[14px] text-primary-color">
              {/* {" "}
            React Js Developer */}

              {item.department}
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
                if (item.value === status) {
                  return item.label;
                }
              })}
            </p>
          </div>
          <div className="cardSections mt-10">
            <div className="cardSectionItem">
              <div className="cardSection__title">{labels.salaryRagne}</div>
              <div className="cardSection__body">{`${minSalary} - ${maxSalary} `}</div>
            </div>
            <div className="cardSectionItem">
              <div className="cardSection__title">{labels.effectiveDate}</div>
              <div className="cardSection__body">
                {moment(createDate).format("Do MMM YY")}
              </div>
            </div>
            <div className="cardSectionItem">
              <div className="cardSection__title">
                {" "}
                <div className="cardSection__title">
                  {labels.experienceRequired}
                </div>
              </div>
              <div className="cardSection__body">{experience}</div>
            </div>
            <div className="cardSectionItem">
              <div className="cardSection__title"> {labels.jobExpires}</div>
              <div className="cardSection__body">
                {" "}
                {moment(endDate).format("Do MMM YY")}
              </div>
            </div>
          </div>
        </SingleItem>
      )}
    </>
  );
}

export default ListItem;
