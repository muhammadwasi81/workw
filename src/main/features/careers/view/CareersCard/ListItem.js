import React, { useState, useEffect } from "react";
import { FieldTimeOutlined } from "@ant-design/icons";
import moment from "moment";
import {
  ItemContent,
  ItemHeader,
  SingleItem,
} from "../../../../sharedComponents/Card/CardStyle";

// import Avatar from "../../../../sharedComponents/Avatar/avatarOLD";
import { Avatar, Tooltip } from "antd";
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
