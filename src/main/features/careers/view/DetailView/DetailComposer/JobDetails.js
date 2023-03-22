import React, { useState, useContext } from "react";
import { Button, Divider, Tag, message } from "antd";
import Avatar from "../../../../../sharedComponents/Avatar/avatarOLD";
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
import { LanguageChangeContext } from "../../../../../../utils/localization/localContext/LocalContext";
import { CareerDictionary } from "../../../localization";
import "./style.css";
import SublineDesigWithTime from "../../../../../sharedComponents/UserShortInfo/SubLine/DesigWithTime";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import CopyToClipboard from "react-copy-to-clipboard";
import { ROUTES } from "../../../../../../utils/routes";

const JobDetails = (props) => {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { CareerDictionaryList } = CareerDictionary[userLanguage];
  const careerDetail = useSelector((state) => {
    return state.careerSlice.careerDetail;
  });
  const [copy, setCopy] = useState(false);

  const { labels } = CareerDictionaryList;

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
    status,
    id,
  } = careerDetail;

  // console.log("career detail", careerDetail);
  // console.log(status, "STATUS")

  const copyfunc = () => {
    setCopy(true);
  };
  // const { name, image, designation } = creator;
  // console.log(jobDesc, "JOB DETAILLLLLL");

  const skillsArray = skills?.split(",");

  // console.log(skillsArray, "SKILLSSS !!!")

  // let notesTime = !moment(new Date()).fromNow(createDate)
  //   ? moment(createDate).format("LT")
  //   : moment(createDate).format("MMM Do YYYY");
  return (
    <>
      {copy && message.success("Copied")}
      <div className="item-card careersQuickDetail">
        <div className="careersShortCard cursor-pointer !flex !flex-row gap-2">
          <div>
            {/* <Avatar size={45} src={creator?.image} /> */}
            <Avatar
              width={40}
              height={40}
              src={creator?.image}
              name={creator?.name}
              round
            ></Avatar>
          </div>
          <div className="flex-1">
            <div className="text-[16px] font-bold text-sky-900">
              {designation}
            </div>
            <div className="font-bold">{department}</div>
            <div className="text-xs">
              {city}, {country} - {moment(createDate).fromNow()}
            </div>
          </div>
          <div className="linkDiv">
            {
              status === 2 ?
              <>
                <Tag className="LinkTag ThemeBtn" onClick={() => props.apply()}>
                  {/* {"Apply Now"} */}
                  {labels.applyNow}
                </Tag>
                <CopyToClipboard
                text={`${window.location.origin}${ROUTES.CAREER.APPLYJOB}/${id}`}
                onCopy={copyfunc}
              >
                <Tag className="LinkTag ThemeBtn">
                  <LinkOutlined /> {labels.copyLink}
                </Tag>
              </CopyToClipboard>
              </>
            : 
            "" 
            }
          </div>
        </div>

        <div className="mt-5">
          <div className="font-bold">{labels.jobdescription}</div>
          <div>{description}</div>
        </div>

        <div className="mt-5">
          <div className="font-bold">{labels.skillsRequired}</div>
          <div>
            {skills
              ? skillsArray?.map((item, index) => {
                  return <Tag className="LinkTag">{item}</Tag>;
                })
              : null}
             {/* <Tag className="LinkTag">{"React.js"}</Tag>
            <Tag className="LinkTag">{"React Native"}</Tag>
             <Tag className="LinkTag">{"Node.js"}</Tag>
             <Tag className="LinkTag">{"Mongo db"}</Tag>
             <Tag className="LinkTag">{"Express.js"}</Tag>
             <Tag className="LinkTag">{"Next.js"}</Tag> */}
          </div>
        </div>

        <div className="cardSections mt-10">
          <div className="cardSectionItem">
            <div className="cardSection__title">{labels.salaryRange}</div>
            <div className="cardSection__body">{`${minSalary} - ${maxSalary} `}</div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">{labels.effectiveDate}</div>
            <div className="cardSection__body">
              {createDate ? moment(createDate).format("Do MMM YY") : "-"}
            </div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">{labels.experience}</div>
            <div className="cardSection__body">
              {experience ? experience : "-"}
            </div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">{labels.jobExpires}</div>
            <div className="cardSection__body">
              {" "}
              {endDate ? moment(endDate).format("Do MMM YY") : "-"}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default JobDetails;
