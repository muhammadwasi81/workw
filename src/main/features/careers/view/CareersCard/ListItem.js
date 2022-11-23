import React, { useState, useEffect } from "react";
import { FieldTimeOutlined } from "@ant-design/icons";
import moment from "moment";
import {
  ItemContent,
  ItemHeader,
  SingleItem,
} from "../../../../sharedComponents/Card/CardStyle";
import AvatarOld from "../../../../sharedComponents/Avatar/avatarOLD";
import Avatar from "../../../../sharedComponents/Avatar/avatar";
import { Tooltip } from "antd";
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
            <div className="cardSection__title">{"Salary Range"}</div>
            <div className="cardSection__body">{`${minSalary} - ${maxSalary} `}</div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">{"Effective Date"}</div>
            <div className="cardSection__body">
              {" "}
              {moment(createDate).format("Do MMM YY")}
            </div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">{"Applicants"}</div>
            <div className="cardSection__body">{`${applicantsCount} `}</div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">Approvers</div>
            <div className="cardSection__body">
              {/* <Avatar.Group maxCount={2}>
                {approvers &&
                  approvers.map((el, i) => {
                    return (
                      <>
                        <Tooltip title={el.approver?.name} placement="top">
                          <AvatarCustom
                            width={30}
                            height={30}
                            src={el.approver?.image}
                            name={el.approver?.name}
                            round
                          ></AvatarCustom>
                        </Tooltip>
                      </>
                    );
                  })}
              </Avatar.Group> */}
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
            <div className="cardSection__title">Interviewers</div>
            <div className="cardSection__body">
              {/* <Avatar.Group maxCount={2}>
                {interviewers &&
                  interviewers.map((el, i) => {
                    return (
                      <>
                        <Tooltip title={el.user?.name} placement="top">
                          <AvatarCustom
                            width={30}
                            height={30}
                            src={el.user?.image}
                            name={el.user?.name}
                            round
                          ></AvatarCustom>
                        </Tooltip>
                      </>
                    );
                  })}
              </Avatar.Group> */}
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
        </div>
      </SingleItem>
    </>
  );
}

export default ListItem;
