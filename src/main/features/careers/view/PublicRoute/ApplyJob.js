import React, { useEffect, useState, useContext } from "react";
import { Button, Divider, Tag, Avatar, message } from "antd";
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
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
import { CareerDictionary } from "../../localization";
import { useDispatch, useSelector } from "react-redux";
import { getCareerByIdAction } from "../../store/action";
import { useParams } from "react-router-dom";
import ApplyComposer from "../Composers/applyComposer";
import CopyToClipboard from "react-copy-to-clipboard";
import { ROUTES } from "../../../../../utils/routes";

const ApplyJob = (props) => {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { CareerDictionaryList } = CareerDictionary[userLanguage];
  const { id } = useParams();
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [careerData, setCareerData] = useState({});
  // const [copy, setCopy] = useState(false);

  const { labels } = CareerDictionaryList;
  // console.log(labels);
  const careerDetail = useSelector((state) => {
    return state.careerSlice.careerDetail;
  });

  const careers = useSelector((state) => {
    return state.careerSlice.items;
  });

  useEffect(() => {
    //call career by id function
    dispatch(getCareerByIdAction(id));
  }, []);

  useEffect(() => {
    //works at start to set first element from in state array
    if (Object.keys(careers).length > 1) {
      console.log(careers, "***");
      setCareerData(careers[0]);
    }
  }, [careers]);

  console.log(id, "id");

  useEffect(() => {
    console.log("useEffect works when component update");
    if (Object.keys(careerDetail).length > 1) {
      setCareerData(careerDetail);
    }
  }, [careerDetail]);

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
  } = careerData;

  // console.log(careerDetail, "career detail in apply job");

  const handleDrawerClose = () => {
    setVisible(false);
  };

  const handleDrawerOpen = () => {
    console.log("handle drawer open");
    setVisible(true);
  };

  const skillsArray = skills?.split(",");

  console.log(props);

  return (
    <>
      {/* {copy && message.success("Copied")} */}
      <ApplyComposer visible={visible} onClose={handleDrawerClose} id={id} />
      <div className="w-full m-auto">
        <div
          className="item careersQuickDetail"
          style={{ width: `${props.width}` }}
        >
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
              {/* {props.isShowCopyBtn && (
              <CopyToClipboard
                text={`${window.location.origin}${ROUTES.CAREER.APPLYJOB}/${id}`}
                onCopy={copyfunc}
              >
                <Tag className="LinkTag ThemeBtn">
                  <LinkOutlined /> {labels.copyLink}
                </Tag>
              </CopyToClipboard>
            )} */}
            </div>
          </div>

          <div className="mt-5">
            <div className="font-bold">{labels.jobDescription}</div>
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
              s
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
      </div>
    </>
  );
};
export default ApplyJob;
