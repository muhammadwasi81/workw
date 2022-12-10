import React, { useState, useEffect, useContext } from "react";
import { FieldTimeOutlined } from "@ant-design/icons";
import moment from "moment";
import {
  ItemContent,
  ItemHeader,
  SingleItem,
} from "../../../../sharedComponents/Card/CardStyle";
import AvatarOld from "../../../../sharedComponents/Avatar/avatarOLD";
import Avatar from "../../../../sharedComponents/Avatar/avatar";
// import JobDetails from "../../DetailView/DetailComposer/JobDetails";
import { useDispatch, useSelector } from "react-redux";
import CardProfileTopView from "../../../travel/view/ListView/CardProfileTopView";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
import { CareerDictionary } from "../../localization/index";

function ListItem({ item, onClick, onClickMyCareer }) {
  // console.log(item, "description");
  const { userLanguage } = useContext(LanguageChangeContext);
  const { CareerDictionaryList } = CareerDictionary[userLanguage];
  const { labels } = CareerDictionaryList;

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
    effecttiveDate,
    approvers,
    applicantsCount,
    description,
    interviewers,
  } = item;
  const { currentTab } = useSelector((state) => state.careerSlice);

  console.log("items", item);

  return (
    <>
      <SingleItem onClick={onClick} className="cursor-pointer">
        <CardProfileTopView
          profileImgSrc={
            <AvatarOld
              width={40}
              height={40}
              src={item.creator?.image}
              name={item.creator.name}
              round
            ></AvatarOld>
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
            {designation}
          </div>
          <p className="careerFooterText">
            {city}, {country}
          </p>
          <p className="careersDescShort">{description}</p>
        </ItemContent>
        <div className="cardSections mt-10">
          <div className="cardSectionItem">
            <div className="cardSection__title">{labels.salaryRange}</div>
            <div className="cardSection__body">{`${minSalary} - ${maxSalary} `}</div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">{labels.effectiveDate}</div>
            <div className="cardSection__body">
              {" "}
              {moment(createDate).format("Do MMM YY")}
            </div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">{labels.applicants}</div>
            <div className="cardSection__body">{`${applicantsCount} `}</div>
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
          <div className="cardSectionItem">
            <div className="cardSection__title">{labels.interviewers}</div>
            <div className="cardSection__body">
              {interviewers && (
                <Avatar
                  isAvatarGroup={true}
                  isTag={false}
                  heading={"users"}
                  membersData={interviewers ? interviewers : []}
                  text={"Users"}
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
