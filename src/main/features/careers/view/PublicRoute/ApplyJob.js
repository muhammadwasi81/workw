import React, { useEffect, useState } from "react";
import { Button, Divider, Tag, Avatar } from "antd";
import "antd/dist/antd.css";
import StatusTag from "../../../../sharedComponents/Tag/StatusTag";
import {
  ItemContent,
  ItemHeader,
  SingleItem,
} from "../../../../sharedComponents/Card/CardStyle";
import { LinkOutlined } from "@ant-design/icons";
import "./style.css";
import SublineDesigWithTime from "../../../../sharedComponents/UserShortInfo/SubLine/DesigWithTime";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { getCareerByIdAction } from "../../store/action";
import { useParams } from "react-router-dom";
import ApplyComposer from "../Composers/applyComposer";

const JobDetails = (props) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    //call career by id function
    dispatch(getCareerByIdAction(id));
  }, []);

  console.log(id, "id");
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

  console.log(careerDetail, "career detail in apply job");

  const handleDrawerClose = () => {
    setVisible(false);
  };

  const handleDrawerOpen = () => {
    setVisible(true);
  };

  const skillsArray = skills?.split(",");

  //   let notesTime = !moment(new Date()).fromNow(createDate)
  //     ? moment(createDate).format("LT")
  //     : moment(createDate).format("MMM Do YYYY");
  return (
    <>
      <ApplyComposer visible={visible} onClose={handleDrawerClose} id={id} />
      <div className="item careersQuickDetail">
        <div className="careersShortCard cursor-pointer !flex !flex-row gap-2">
          <div>
            <Avatar size={45} src={creator?.image} />
          </div>
          <div className="flex-1">
            <div className="text-[16px] font-bold text-sky-900">
              {designation ? designation : "-"}
            </div>

            <div className="font-bold">{department}</div>
            <div className="text-xs">
              {city}, {country} - {moment(createDate).fromNow()}
            </div>
          </div>
          <div className="linkDiv">
            <Tag className="LinkTag ThemeBtn" onClick={handleDrawerOpen}>
              {"Apply Now"}
            </Tag>
            {/* <Tag className="LinkTag ThemeBtn">
              <LinkOutlined /> {"Copy Link"}
            </Tag> */}
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
          </div>
        </div>

        <div className="cardSections mt-10">
          <div className="cardSectionItem">
            <div className="cardSection__title">Salary Range</div>
            <div className="cardSection__body">
              {minSalary ? `${minSalary} - ${maxSalary} ` : "-"}
            </div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">Effective Date</div>
            <div className="cardSection__body">
              {createDate ? moment(createDate).format("Do MMM YY") : "-"}
            </div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">Experience Required</div>
            <div className="cardSection__body">
              {experience ? experience : "-"}
            </div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">Job Expires</div>
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
