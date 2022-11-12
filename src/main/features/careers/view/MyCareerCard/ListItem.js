import React, { useState, useEffect, useContext } from "react";
import { FieldTimeOutlined } from "@ant-design/icons";
import moment from "moment";
import {
  ItemContent,
  ItemHeader,
  SingleItem,
} from "../../../../sharedComponents/Card/CardStyle";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
import { CareerDictionary } from "../../localization";
// import Avatar from "../../../../sharedComponents/Avatar/avatar";
import { Avatar, Image, Tooltip } from "antd";
// import JobDetails from "../../DetailView/DetailComposer/JobDetails";
import { CareerStatusEnum, CareerLevelTypeEnum } from "../../utils/enums";
import { useDispatch, useSelector } from "react-redux";
import StatusTag from "../../../../sharedComponents/Tag/StatusTag";
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
  } = item;
  const { currentTab } = useSelector((state) => state.careerSlice);
  const { labels } = CareerDictionaryList;

  console.log("props", onClickMyCareer);

  return (
    <>
      <SingleItem onClick={onClickMyCareer} className="cursor-pointer">
        {/* <ItemHeader className="ItemHeader">
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
        </ItemHeader> */}
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
            {designation}
          </div>
          <p className="careerFooterText">
            {city}, {country}
          </p>
          <p className="careersDescShort">{description}</p>
        </ItemContent>
        {/* <div>
          {item.city} 
          {item.country}
           {item.jobTypeId}
            
          {item.createDate}
        </div> */}
        {/* <div className="flex justify-between">
          <div className="flex gap-x-8">
            <p className="careerFooterText">
              {city}, {country} -{" "}
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
        </div> */}
        <div className="cardSections mt-10">
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
            <div className="cardSection__title">Manager</div>
            <div className="cardSection__body">
              {manager && (
                <>
                  <Tooltip title={manager.name} placement="top">
                    <Avatar
                      src={
                        manager.image
                          ? manager.image
                          : "https://joeschmoe.io/api/v1/random"
                      }
                    />
                  </Tooltip>
                </>
              )}
            </div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">Members</div>
            <div className="cardSection__body">
              {" "}
              <Avatar.Group maxCount={2}>
                {members &&
                  members.map((el, i) => {
                    return (
                      <>
                        <Tooltip title={el.member?.name} placement="top">
                          <Avatar
                            src={
                              el.member?.image
                                ? el.member?.image
                                : "https://joeschmoe.io/api/v1/random"
                            }
                          />
                        </Tooltip>
                      </>
                    );
                  })}
              </Avatar.Group>
            </div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">InterViewers</div>
            <div className="cardSection__body">
              <Avatar.Group maxCount={2}>
                {interviewers &&
                  interviewers.map((el, i) => {
                    return (
                      <>
                        <Tooltip title={el.user?.name} placement="top">
                          <Avatar
                            src={
                              el.user?.image
                                ? el.user?.image
                                : "https://joeschmoe.io/api/v1/random"
                            }
                          />
                        </Tooltip>
                      </>
                    );
                  })}
              </Avatar.Group>
            </div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">Post Interviewers</div>
            <div className="cardSection__body">
              <Avatar.Group maxCount={2}>
                {postInterviewers &&
                  postInterviewers.map((el, i) => {
                    return (
                      <>
                        <Tooltip title={el.user?.name} placement="top">
                          <Avatar
                            src={
                              el.user?.image
                                ? el.user?.image
                                : "https://joeschmoe.io/api/v1/random"
                            }
                          />
                        </Tooltip>
                      </>
                    );
                  })}
              </Avatar.Group>
            </div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">Approvers</div>
            <div className="cardSection__body">
              <Avatar.Group maxCount={2}>
                {approvers &&
                  approvers.map((el, i) => {
                    return (
                      <>
                        <Tooltip title={el.approver?.name} placement="top">
                          <Avatar
                            src={
                              el.approver?.image
                                ? el.approver?.image
                                : "https://joeschmoe.io/api/v1/random"
                            }
                          />
                        </Tooltip>
                      </>
                    );
                  })}
              </Avatar.Group>
            </div>
          </div>
        </div>
      </SingleItem>
    </>
  );
}

export default ListItem;
