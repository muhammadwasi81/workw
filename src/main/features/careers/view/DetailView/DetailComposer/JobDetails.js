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

const JobDetails = () => {
  const careerDetail = useSelector((state) => {
    return state.careerSlice.careerDetail;
  });

  const {
    city,
    country,
    createDate,
    description,
    skills,
    creator,
  } = careerDetail;
  const { name, image, designation } = creator;
  // console.log(jobDesc, "JOB DETAILLLLLL");

  let notesTime = !moment(new Date()).fromNow(createDate)
    ? moment(createDate).format("LT")
    : moment(createDate).format("MMM Do YYYY");
  return (
    <>
      <div className="item-card careersQuickDetail">
        <div className="careersShortCard cursor-pointer !flex !flex-row gap-2">
          <div>
            <Avatar size={45} src={image} />
          </div>
          <div className="flex-1">
            <div className="text-[16px] font-bold text-sky-900">
              {designation}
            </div>
            <div className="font-bold">Miletap</div>
            <div className="text-xs">
              Karachi, Pakistan - {moment(createDate).fromNow()}
            </div>
          </div>
          <div className="linkDiv">
            <Tag className="LinkTag ThemeBtn">{"Apply Now"}</Tag>
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
              ? skills?.map((item, index) => {
                  return;
                  <Tag className="LinkTag">{item}</Tag>;
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
            <div className="cardSection__title">Salary For</div>
            <div className="cardSection__body">{"user.name"}</div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">Effective Date</div>
            <div className="cardSection__body">
              {moment("09-22-2022").format("Do MMM YY")}
            </div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">Basic Salary</div>
            <div className="cardSection__body">{"basicSalary"}</div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">Salary For</div>
            <div className="cardSection__body">{"user.name"}</div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">Effective Date</div>
            <div className="cardSection__body">
              {moment("09-22-2022").format("Do MMM YY")}
            </div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">Basic Salary</div>
            <div className="cardSection__body">{"basicSalary"}</div>
          </div>
        </div>
      </div>
    </>
  );
};
export default JobDetails;
