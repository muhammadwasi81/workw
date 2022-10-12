import React from "react";
import { Button, Divider, Tag } from "antd";
import "antd/dist/antd.css";
import JobHeader from "./JobHeader";
import StatusTag from "../../../../../sharedComponents/Tag/StatusTag";
import {
  ItemContent,
  ItemHeader,
  SingleItem,
} from "../../../../../sharedComponents/Card/CardStyle";
import UserInfo from "../../../../../sharedComponents/UserShortInfo/UserInfo";

import "./style.css";
import SublineDesigWithTime from "../../../../../sharedComponents/UserShortInfo/SubLine/DesigWithTime";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";

const JobDetails = () => {
  const jobDesc = useSelector((state) => {
    return state.careerSlice.careerDetail;
  });
  console.log(jobDesc, "JOB DETAILLLLLL");

  let notesTime = !moment(new Date()).fromNow(jobDesc.createDate)
    ? moment(jobDesc.createDate).format("LT")
    : moment(jobDesc.createDate).format("MMM Do YYYY");
  return (
    <>
      <SingleItem>
        <ItemHeader>
          <div className="left">
            <UserInfo
              avatarSrc={jobDesc.creator?.image}
              name={jobDesc.creator?.name}
              // Subline={
              //   <SublineDesigWithTime
              //     designation={
              //       "creator.designation" ? "creator.designation" : ""
              //     }
              //     time={moment().fromNow()}
              //   />
              // }
            />
          </div>
          <div className="right">
            <StatusTag status={1}></StatusTag>

            {/* <Tag className="IdTag">{"referenceNo"}</Tag> */}
            <Button type="primary" className="icon-btn" shape="round">
              Icon
            </Button>
          </div>
        </ItemHeader>
        <div className="font-bold text-[14px] text-primary-color  pt-3 pb-3">
          {/* {" "}
            React Js Developer */}
          {jobDesc.designation}
        </div>

        <div className="font-bold text-[14px] text-primary-color  pt-3 pb-0">
          {/* {" "}
            React Js Developer */}
          Job Description
        </div>
        <div className="description w-full pt-2 pb-3 h-[100px]">
          {/* <h1>Job description</h1> */}
          {jobDesc.description?.length > 0 ? (
            <p>{jobDesc.description}</p>
          ) : (
            <p> No description </p>
          )}
        </div>

        <div className="cardSections">
          <div className="cardSectionItem">
            <div className="cardSection__title">Salary Range</div>
            <div className="cardSection__body">{`Rs:${jobDesc.minSalary}-${jobDesc.maxSalary}`}</div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">Experienced Required</div>
            <div className="cardSection__body">{`${jobDesc.experience} Years of experienced`}</div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">Applicants</div>
            <div className="cardSection__body">{"50"}</div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">Job Expires</div>
            <div className="cardSection__body">{notesTime}</div>
          </div>
        </div>
      </SingleItem>
    </>
  );
};
export default JobDetails;
