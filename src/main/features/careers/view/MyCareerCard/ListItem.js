import React, { useContext, useEffect, useState } from "react";

import moment from "moment";
import {
  ItemContentCareers,
  SingleItem,
} from "../../../../sharedComponents/Card/CardStyle";
import Avatar from "../../../../sharedComponents/Avatar/avatar";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
import { CareerDictionary } from "../../localization";
import { Image, Tag, Tooltip } from "antd";
import AvatarCustom from "../../../../sharedComponents/Avatar/avatarOLD";
import { useSelector } from "react-redux";
import CardProfileTopView from "../../../travel/view/ListView/CardProfileTopView";

function ListItem({ item, onClick, onClickMyCareer }) {
  // console.log(item, "description");
  const { userLanguage } = useContext(LanguageChangeContext);
  const { CareerDictionaryList } = CareerDictionary[userLanguage];
  const {
    jobTypeId,
    createDate,
    status,
    city,
    country,
    designation,
    image,
    minSalary,
    description,
    maxSalary,
    experience,
    endDate,
    members,
    interviewers,
    referenceNo,
    postInterviewers,
    manager,
    approvers,
    skills,
  } = item;
  const { currentTab } = useSelector((state) => state.careerSlice);
  const { labels } = CareerDictionaryList;
  const skillsArray = skills?.split(",");

  // const mangerArrFunc = (manager) => {
  //   let newArr = [];
  //   let innerObj = {};

  //   innerObj = { user: manager };
  //   newArr.push(innerObj);

  //   setManagerState(newArr);
  // };

  // console.log(item, "item");

  return (
    <>
      <SingleItem onClick={onClickMyCareer} className="cursor-pointer">
        <CardProfileTopView
          profileImgSrc={
            <AvatarCustom
              width={40}
              height={40}
              src={item.creator?.image}
              name={item.creator?.name}
              round
            ></AvatarCustom>
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
        <ItemContentCareers className="!h-[100px] !max-h-[100px]">
          <div className="font-bold text-[14px] text-primary-color">
            {designation}
          </div>
          <p className="careerFooterText">
            {city}, {country}
          </p>
          <p className="careersDescShort">{description}</p>
        </ItemContentCareers>
        <div className="skillsContainer">
          <div className="font-bold">{labels.skillsRequired}</div>
          <div>
            {skills
              ? skillsArray?.map((item, index) => {
                  return <Tag className="LinkTag">{item}</Tag>;
                })
              : null}
          </div>
        </div>
        <div className="cardSections">
          <div className="cardSectionItem">
            <div className="cardSection__title">{labels.salaryRange}</div>
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
              {labels.experienceRequired}
            </div>
            <div className="cardSection__body">{experience}</div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">{labels.jobExpires}</div>
            <div className="cardSection__body">
              {" "}
              {moment(endDate).format("Do MMM YY")}
            </div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">{labels.manager}</div>
            <div className="cardSection__body">
              {
                <Avatar
                  isAvatarGroup={true}
                  isTag={false}
                  heading={"Users"}
                  membersData={[{ user: manager }]}
                  // membersData={manager ? [manager] : []}
                  // membersData={[]}
                  text={"user"}
                  image={"https://joeschmoe.io/api/v1/random"}
                />
              }
            </div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">{labels.members}</div>
            <div className="cardSection__body">
              {" "}
              {console.log(members, labels.members, "mmeerrrrrrr") &&
                members && (
                  <Avatar
                    isAvatarGroup={true}
                    isTag={false}
                    heading={labels.members}
                    membersData={members ? members : []}
                    text={"member"}
                    image={"https://joeschmoe.io/api/v1/random"}
                  />
                )}
            </div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">{labels.interviewers}</div>
            <div className="cardSection__body">
              {interviewers && (
                <Avatar
                  isAvatarGroup={true}
                  isTag={false}
                  heading={"Users"}
                  membersData={interviewers ? interviewers : []}
                  text={"user"}
                  image={"https://joeschmoe.io/api/v1/random"}
                />
              )}
            </div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">{labels.postInterviewers}</div>
            <div className="cardSection__body">
              {postInterviewers && (
                <Avatar
                  isAvatarGroup={true}
                  isTag={false}
                  heading={"Users"}
                  membersData={postInterviewers ? postInterviewers : []}
                  text={"user"}
                  image={"https://joeschmoe.io/api/v1/random"}
                />
              )}
            </div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">{labels.approvers}</div>
            <div className="cardSection__body">
              {approvers && (
                <Avatar
                  isAvatarGroup={true}
                  isTag={false}
                  heading={"approvers"}
                  membersData={approvers ? approvers : []}
                  text={"Approvers"}
                  image={"https://joeschmoe.io/api/v1/random"}
                />
              )}
            </div>
          </div>
        </div>
      </SingleItem>
    </>
  );
}

export default ListItem;
