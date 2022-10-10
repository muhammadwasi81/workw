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
const JobDetails = () => {
  return (
    <>
      {/* <SingleItem>
        <ItemHeader>
          <div className="user-info">
            <UserInfo avatarSrc={"Sanjna"} name={"sanjna"} />
            <div className="btn-container">
              <StatusTag>Approved</StatusTag>
              <Button type="primary" className="icon-btn" shape="round">
                Icon
              </Button>
            </div>
          </div>
        </ItemHeader>
        <Divider />
        <div className="job-description">
          <h1>JOB NAME</h1>
          <h1>Job Description</h1>
          <p>
            something something something something something something
            something something
          </p>
        </div>
      </SingleItem> */}
      <SingleItem onClick={() => {}}>
        <ItemHeader>
          <div className="left">
            <UserInfo
              avatarSrc={undefined}
              name={"creator name"}
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
        <div className="description w-full pt-3 pb-5 h-[100px]">
          <h1>Job Name</h1>
          <h1>Job description</h1>
          {"".length > 0 ? <p>{"jjdskjsjsjk"}</p> : <p> No description </p>}
        </div>

        <div className="cardSections">
          <div className="cardSectionItem">
            <div className="cardSection__title">Salary Range</div>
            <div className="cardSection__body">{"Rs-35000-50000"}</div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">Experienced Required</div>
            <div className="cardSection__body">{"1 Years of experienced"}</div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">Applicants</div>
            <div className="cardSection__body">{"50"}</div>
          </div>
        </div>
      </SingleItem>
    </>
  );
};
export default JobDetails;
