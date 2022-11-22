import React, { useContext } from "react";

import moment from "moment";
import {
  ItemContent,
  SingleItem,
} from "../../../../sharedComponents/Card/CardStyle";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
import { CareerDictionary } from "../../localization";
import { Avatar, Image, Tooltip } from "antd";
import AvatarCustom from "../../../../sharedComponents/Avatar/avatarOLD";
import { useSelector } from "react-redux";
import CardProfileTopView from "../../../travel/view/ListView/CardProfileTopView";

function ListItem({ item, onClick, onClickMyCareer }) {
  // console.log(item, "description");
  const { userLanguage } = useContext(LanguageChangeContext);
  const { CareerDictionaryList } = CareerDictionary[userLanguage];
  const {
    jobTypeId,
    createDate,
    status,
    city,
    country,
    designation,
    image,
    minSalary,
    description,
    maxSalary,
    experience,
    endDate,
    members,
    interviewers,
    referenceNo,
    postInterviewers,
    manager,
    approvers,
  } = item;
  const { currentTab } = useSelector((state) => state.careerSlice);
  const { labels } = CareerDictionaryList;

  return (
    <>
      <SingleItem onClick={onClickMyCareer} className="cursor-pointer">
        <CardProfileTopView
          profileImgSrc={
            <AvatarCustom
              width={40}
              height={40}
              src={item.creator?.image}
              name={item.creator?.name}
              round
            ></AvatarCustom>
          }
          createDate={item.createDate}
          isPublic={true}
          name={item.creator && item.creator.name}
          destination={
            item.creator && item.creator.designation
              ? item.creator.designation
              : "Not Designated"
          }
          refNo={referenceNo}
          status={item.status}
          profileImgSize={40}
        />
        <ItemContent className="!h-[100px] !max-h-[100px]">
          <div className="font-bold text-[14px] text-primary-color">
            {designation}
          </div>
          <p className="careerFooterText">
            {city}, {country}
          </p>
          <p className="careersDescShort">{description}</p>
        </ItemContent>
        {/* <div>
          {item.city} 
          {item.country}
           {item.jobTypeId}
            
          {item.createDate}
        </div> */}
        {/* <div className="flex justify-between">
          <div className="flex gap-x-8">
            <p className="careerFooterText">
              {city}, {country} -{" "}
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
        </div> */}
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
            <div className="cardSection__title">
              {labels.experienceRequired}
            </div>
            <div className="cardSection__body">{experience}</div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">{labels.jobExpires}</div>
            <div className="cardSection__body">
              {" "}
              {moment(endDate).format("Do MMM YY")}
            </div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">Manager</div>
            <div className="cardSection__body">
              {manager && (
                <>
                  <Tooltip title={manager.name} placement="top">
                    <AvatarCustom
                      width={30}
                      height={30}
                      src={manager.image}
                      name={manager.name}
                      round
                    ></AvatarCustom>
                  </Tooltip>
                </>
              )}
            </div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">Members</div>
            <div className="cardSection__body">
              {" "}
              <Avatar.Group maxCount={2}>
                {members &&
                  members.map((el, i) => {
                    return (
                      <>
                        <Tooltip title={el.member?.name} placement="top">
                          <AvatarCustom
                            width={30}
                            height={30}
                            src={el.member?.image}
                            name={el.member?.name}
                            round
                          ></AvatarCustom>
                        </Tooltip>
                      </>
                    );
                  })}
              </Avatar.Group>
            </div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">InterViewers</div>
            <div className="cardSection__body">
              <Avatar.Group maxCount={2}>
                {interviewers &&
                  interviewers.map((el, i) => {
                    return (
                      <>
                        <Tooltip title={el.user?.name} placement="top">
                          <AvatarCustom
                            width={30}
                            height={30}
                            src={el.user?.image}
                            name={el.user?.name}
                            round
                          ></AvatarCustom>
                        </Tooltip>
                      </>
                    );
                  })}
              </Avatar.Group>
            </div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">Post Interviewers</div>
            <div className="cardSection__body">
              <Avatar.Group maxCount={2}>
                {postInterviewers &&
                  postInterviewers.map((el, i) => {
                    return (
                      <>
                        <Tooltip title={el.user?.name} placement="top">
                          <AvatarCustom
                            width={30}
                            height={30}
                            src={el.user?.image}
                            name={el.user?.name}
                            round
                          ></AvatarCustom>
                        </Tooltip>
                      </>
                    );
                  })}
              </Avatar.Group>
            </div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">Approvers</div>
            <div className="cardSection__body">
              <Avatar.Group maxCount={2}>
                {approvers &&
                  approvers.map((el, i) => {
                    return (
                      <>
                        <Tooltip title={el.approver?.name} placement="top">
                          <AvatarCustom
                            width={30}
                            height={30}
                            src={el.approver?.image}
                            name={el.approver?.name}
                            round
                          ></AvatarCustom>
                        </Tooltip>
                      </>
                    );
                  })}
              </Avatar.Group>
            </div>
          </div>
        </div>
      </SingleItem>
    </>
  );
}

export default ListItem;
