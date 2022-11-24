import React, { useContext } from "react";
import { Button, Drawer, Form, Input } from "antd";
import Avatar from "../../../../sharedComponents/Avatar/avatarOLD";
import { useSelector } from "react-redux";
import { FieldTimeOutlined } from "@ant-design/icons";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
import { CareerDictionary } from "../../localization";
import RemarksApproval from "../../../../sharedComponents/AppComponents/Approvals/view";
import {
  ItemHeader,
  SingleItem,
  ItemContent,
} from "../../../../sharedComponents/Card/CardStyle";
import { CareerStatusEnum, CareerLevelTypeEnum } from "../../utils/enums";
import moment from "moment";
import { ApprovalsModule } from "../../../../sharedComponents/AppComponents/Approvals/enums";
import CardProfileTopView from "../../../travel/view/ListView/CardProfileTopView";

const ApprovalComposer = (props) => {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { CareerDictionaryList, Direction } = CareerDictionary[userLanguage];
  const { careerDetail } = useSelector((state) => state.careerSlice);
  const { labels } = CareerDictionaryList;
  console.log(careerDetail, "dsfsd");
  const {
    creator,
    department,
    description,
    designation,
    jobTypeId,
    city,
    country,
    status,
    minSalary,
    maxSalary,
    createDate,
    endDate,
    experience,
    approvers,
    referenceNo,
  } = careerDetail;

  return (
    <>
      <Drawer
        title={
          <h1
            style={{
              fontSize: "20px",
              margin: 0,
              textAlign: Direction === "ltr" ? "" : "end",
            }}
          >
            {labels.careerdetail}
          </h1>
        }
        width="768"
        // placement={
        //   (Direction === "ltr" ? "left" : "right",
        //   isTablet ? "bottom" : "right")
        // }
        placement={Direction === "rtl" ? "left" : "right"}
        onClose={props.onClose}
        visible={props.visible}
        className="detailedViewComposer drawerSecondary"
        style={{
          cursor: "pointer",
        }}
      >
        <SingleItem>
          <ItemHeader className="ItemHeader">
            <CardProfileTopView
              profileImgSrc={
                <Avatar
                  width={40}
                  height={40}
                  src={creator?.image}
                  name={creator?.name}
                  round
                ></Avatar>
              }
              createDate={createDate}
              isPublic={true}
              name={creator && creator.name}
              destination={
                creator && creator.designation
                  ? creator.designation
                  : "Not Designated"
              }
              refNo={referenceNo}
              status={status}
              profileImgSize={40}
            />
            {/* <div className="flex items-center gap-3">
              <Avatar
                image={creator?.image}
                // className="addPostAvatar"
                name={creator?.name}
                width={40}
                height={40}
                round={true}
              />
              <div className="font-bold text-[15px] text-primary-color">
                {designation}
              </div>
            </div> */}
          </ItemHeader>
          <ItemContent className="!h-[100px] !max-h-[100px]">
            <div className="font-bold text-[14px] text-primary-color">
              {/* {" "}
            React Js Developer */}

              {department}
            </div>
            <p className="careersDescShort">{description}</p>
          </ItemContent>
          {/* <div>
          {item.city} 
          {item.country}
           {item.jobTypeId}
            
          {item.createDate}
        </div> */}
          <div className="flex justify-between">
            <div className="flex gap-x-8">
              <p className="careerFooterText">
                {city}, {country} -{" "}
                {CareerLevelTypeEnum.map((item) => {
                  if (item.value === jobTypeId) {
                    return item.label;
                  }
                })}
              </p>
              <p className="careerFooterText flex gap-x-2 items-baseline">
                <FieldTimeOutlined />
                <p>{moment(createDate).fromNow()}</p>
              </p>
            </div>
            <p className="careersDescShort">
              {CareerStatusEnum.map((item) => {
                if (item.value === status) {
                  return item.label;
                }
              })}
            </p>
          </div>
          <div className="cardSections mt-10">
            <div className="cardSectionItem">
              <div className="cardSection__title">{labels.salaryRange}</div>
              <div className="cardSection__body">{`${minSalary} - ${maxSalary} `}</div>
            </div>
            <div className="cardSectionItem">
              <div className="cardSection__title">{labels.effectiveDate}</div>
              <div className="cardSection__body">
                {moment(createDate).format("Do MMM YY")}
              </div>
            </div>
            <div className="cardSectionItem">
              <div className="cardSection__title">{labels.experience}</div>
              <div className="cardSection__body">{experience}</div>
            </div>
            <div className="cardSectionItem">
              <div className="cardSection__title">{labels.jobExpires}</div>
              <div className="cardSection__body">
                {" "}
                {moment(endDate).format("Do MMM YY")}
              </div>
            </div>
          </div>
        </SingleItem>
        <RemarksApproval
          data={approvers}
          title={labels.approvers}
          module={ApprovalsModule.CareerApproval}
          onStatusChanged={() => {}}
        />
      </Drawer>
    </>
  );
};

export default ApprovalComposer;
