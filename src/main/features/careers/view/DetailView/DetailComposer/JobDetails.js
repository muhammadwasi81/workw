import React from "react";
import { Button, Divider, Tag, Avatar } from "antd";
import "antd/dist/antd.css";
import JobHeader from "./JobHeader";
import StatusTag from "../../../../../sharedComponents/Tag/StatusTag";
import {
  ItemContent,
  ItemHeader,
  SingleItem,
} from "../../../../../sharedComponents/Card/CardStyle";
import UserInfo from "../../../../../sharedComponents/UserShortInfo/UserInfo";
import { LinkOutlined } from "@ant-design/icons";
import "./style.css";
import SublineDesigWithTime from "../../../../../sharedComponents/UserShortInfo/SubLine/DesigWithTime";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";

const JobDetails = (props) => {
  const careerDetail = useSelector((state) => {
    return state.careerSlice.careerDetail;
  });

  const {
    city,
    country,
    createDate,
    description,
    designation,
    department,
    skills,
    creator,
    minSalary,
    maxSalary,
    experience,
    endDate,
  } = careerDetail;
  // const { name, image, designation } = creator;
  // console.log(jobDesc, "JOB DETAILLLLLL");

  const skillsArray = skills?.split(",");

  let notesTime = !moment(new Date()).fromNow(createDate)
    ? moment(createDate).format("LT")
    : moment(createDate).format("MMM Do YYYY");
  return (
    <>
      <div className="item-card careersQuickDetail">
        <div className="careersShortCard cursor-pointer !flex !flex-row gap-2">
          <div>
            <Avatar size={45} src={creator?.image} />
          </div>
          <div className="flex-1">
            <div className="text-[16px] font-bold text-sky-900">
              {designation}
            </div>
            <div className="font-bold">{department}</div>
            <div className="text-xs">
              Karachi, Pakistan - {moment(createDate).fromNow()}
            </div>
          </div>
          <div className="linkDiv">
            <Tag className="LinkTag ThemeBtn" onClick={() => props.apply()}>
              {"Apply Now"}
            </Tag>
            <Tag className="LinkTag ThemeBtn">
              <LinkOutlined /> {"Copy Link"}
            </Tag>
          </div>
        </div>

        <div className="mt-5">
          <div className="font-bold">Job Description</div>
          <div>{description}</div>
        </div>

        <div className="mt-5">
          <div className="font-bold">Skills Required</div>
          <div>
            {skills
              ? skillsArray?.map((item, index) => {
                  return <Tag className="LinkTag">{item}</Tag>;
                })
              : null}
            {/*  <Tag className="LinkTag">{"React.js"}</Tag>
            <Tag className="LinkTag">{"React Native"}</Tag>
             <Tag className="LinkTag">{"Node.js"}</Tag>
             <Tag className="LinkTag">{"Mongo db"}</Tag>
             <Tag className="LinkTag">{"Express.js"}</Tag>
             <Tag className="LinkTag">{"Next.js"}</Tag> */}
          </div>
        </div>

        <div className="cardSections mt-10">
          <div className="cardSectionItem">
            <div className="cardSection__title">Salary Range</div>
            <div className="cardSection__body">{`${minSalary} - ${maxSalary} `}</div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">Effective Date</div>
            <div className="cardSection__body">
              {moment(createDate).format("Do MMM YY")}
            </div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">Experience Required</div>
            <div className="cardSection__body">{experience}</div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">Job Expires</div>
            <div className="cardSection__body">
              {" "}
              {moment(endDate).format("Do MMM YY")}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default JobDetails;
