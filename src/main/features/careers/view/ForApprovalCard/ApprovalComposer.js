import React, { useContext } from "react";
import { Button, Drawer, Form, Input, Skeleton } from "antd";
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
import AvatarCustom from "../../../../sharedComponents/Avatar/avatarOLD";

const ApprovalComposer = (props) => {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { CareerDictionaryList, Direction } = CareerDictionary[userLanguage];
  const { careerDetail, careerByIdLoader } = useSelector(
    (state) => state.careerSlice
  );
  console.log(careerByIdLoader, "loader");
  const { labels } = CareerDictionaryList;
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
        {careerByIdLoader ? (
          <Skeleton
            avatar
            paragraph={{
              rows: 4,
            }}
          />
        ) : (
          <>
            <SingleItem>
              <ItemHeader className="ItemHeader">
                <CardProfileTopView
                  profileImgSrc={
                    <AvatarCustom
                      width={40}
                      height={40}
                      src={creator?.image}
                      name={creator?.name}
                      round
                    ></AvatarCustom>
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
              </ItemHeader>
              <ItemContent className="!h-[100px] !max-h-[100px]">
                <div className="font-bold text-[14px] text-primary-color">
                  {department}
                </div>
                <p className="careersDescShort">{description}</p>
              </ItemContent>
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
              <div className="cardSections">
                <div className="cardSectionItem">
                  <div className="cardSection__title">{labels.salaryRange}</div>
                  <div className="cardSection__body">{`${minSalary} - ${maxSalary} `}</div>
                </div>
                <div className="cardSectionItem">
                  <div className="cardSection__title">
                    {labels.effectiveDate}
                  </div>
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
          </>
        )}
      </Drawer>
    </>
  );
};

export default ApprovalComposer;
