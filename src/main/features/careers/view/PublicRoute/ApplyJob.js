import React, { useEffect, useState, useContext } from "react";
import { Tag } from "antd";
import Avatar from "../../../../sharedComponents/Avatar/avatarOLD";
import moment from "moment";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
import { CareerDictionary } from "../../localization";
import { useDispatch, useSelector } from "react-redux";
import { getCareerByIdAction } from "../../store/action";
import { useParams } from "react-router-dom";
import ApplyComposer from "../Composers/applyComposer";
import { handleOpenApplyComposer } from "../../store/slice";
import CardProfileTopView from "../../../travel/view/ListView/CardProfileTopView";
import { ApprovalDictionary } from "../../../../sharedComponents/AppComponents/Approvals/localization";

const ApplyJob = (props) => {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { CareerDictionaryList } = CareerDictionary[userLanguage];
  const { id } = useParams();
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [careerData, setCareerData] = useState({});

  const { labels } = CareerDictionaryList;

  const careerDetail = useSelector((state) => {
    return state.careerSlice.careerDetail;
  });

  const careers = useSelector((state) => {
    return state.careerSlice.items;
  });

  useEffect(() => {
    //call career by id function
    if (id) {
      dispatch(getCareerByIdAction(id));
    }
  });

  useEffect(() => {
    //works at start to set first element from in state array
    if (Object.keys(careers).length > 1) {
      setCareerData(careers[0]);
    }
  }, [careers]);

  // console.log(id, "id");

  useEffect(() => {
    // console.log("useEffect works when component update");
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
    status,
  } = careerData;

  const handleDrawerClose = () => {
    setVisible(false);
  };

  const handleDrawerOpen = () => {
    console.log("handle drawer open");
    setVisible(true);
    dispatch(handleOpenApplyComposer(true));
  };

  const skillsArray = skills?.split(",");

  console.log(props);

  return (
    <>
      {/* {copy && message.success("Copied")} */}
      <ApplyComposer visible={visible} onClose={handleDrawerClose} id={id} />
      <div className="w-full m-auto flex justify-center">
        <div
          className="item careersQuickDetail QuickDetailPublicRoute"
          style={{ width: `${props.width}` }}
        >
          <div className="careersShortCard cursor-pointer !flex !flex-row gap-2">
            <div>
              <Avatar
                name={creator?.name}
                src={creator?.image}
                round={true}
                width={50}
                height={50}
              />
            </div>
            <div className="flex-1">
              <div className="text-[16px] font-bold text-sky-900">
                {designation ? designation : "No Designation"}
              </div>

              <div className="font-bold">{department}</div>
              <div className="text-xs">
                {city}, {country} - {moment(createDate).fromNow()}
              </div>
            </div>
            <div className="linkDiv">
              {status === 2 && (
                <Tag className="LinkTag ThemeBtn" onClick={handleDrawerOpen}>
                  {labels.applyNow}
                </Tag>
              )}

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
              <div className="cardSection__title"> {labels.salaryRange}</div>
              <div className="cardSection__body">
                {minSalary ? `${minSalary} - ${maxSalary} ` : "-"}
              </div>
            </div>
            <div className="cardSectionItem">
              <div className="cardSection__title">{labels.effectiveDate}</div>
              <div className="cardSection__body">
                {createDate ? moment(createDate).format("Do MMM YY") : "-"}
              </div>
            </div>
            <div className="cardSectionItem">
              <div className="cardSection__title">
                {labels.experienceRequired}
              </div>
              <div className="cardSection__body">
                {experience ? experience : "-"}
              </div>
            </div>
            <div className="cardSectionItem">
              <div className="cardSection__title"> {labels.jobExpires}</div>
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
