import { Image, Tag, Tooltip } from "antd";
import React, { useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import { SingleItem } from "../../../../sharedComponents/Card/CardStyle";
import { Skeleton } from "antd";
import AvatarCustom from "../../../../sharedComponents/Avatar/avatarOLD";
import Avatar from "../../../../sharedComponents/Avatar/avatar";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
import { CareerDictionary } from "../../localization";
import { getCareerByIdAction } from "../../store/action";
import "../styles/style.css";
import { EducationTypeEnum } from "../../utils/enums";
import moment from "moment";

function ShortDetailCard() {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { CareerDictionaryList, Direction } = CareerDictionary[userLanguage];
  const { careerDetail, loader } = useSelector((state) => state.careerSlice);
  const { labels } = CareerDictionaryList;
  console.log(careerDetail); // set these in component

  return (
    <>
      <SingleItem>
        <div className="careersDetailCard">
          <div className="cardLabel">Job Details</div>

          <div className="careersSections">
            <div className="">
              <div className="text-[14px] font-bold text-[grey]">
                {labels.jobTitle}
              </div>
              <div className="text-[14px] font-bold text-[#526bb1] font-extrabold">
                {!loader ? (
                  <>
                    {careerDetail.designation
                      ? careerDetail.designation
                      : "No Designation"}
                  </>
                ) : (
                  <Skeleton.Input active={true} size="small" />
                )}
              </div>
            </div>
            <div className="">
              <div className="text-[14px] font-bold text-[grey]">
                {labels.createdBy}
              </div>
              <div className="text-[14px] font-bold text-[#526bb1] font-extrabold">
                {careerDetail?.creator?.name ? (
                  careerDetail?.creator?.name
                ) : (
                  <Skeleton.Input active={true} size="small" />
                )}
              </div>
            </div>
            <div className="">
              <div className="text-[14px] font-bold text-[grey]">
                {labels.email}
              </div>
              <div className="text-[14px] font-bold text-[#526bb1] font-extrabold">
                {careerDetail?.creator?.email ? (
                  careerDetail?.creator?.email
                ) : (
                  <Skeleton.Input active={true} size="small" />
                )}
              </div>
            </div>
            <div className="">
              <div className="text-[14px] font-bold text-[grey]">Approvers</div>
              <div className="text-[14px] font-bold text-[#526bb1] font-extrabold">
                {careerDetail?.approvers ? (
                  <Avatar
                    isAvatarGroup={true}
                    isTag={false}
                    heading={"approvers"}
                    membersData={
                      careerDetail?.approvers ? careerDetail?.approvers : []
                    }
                    text={"Approvers"}
                    image={"https://joeschmoe.io/api/v1/random"}
                  />
                ) : (
                  <Skeleton.Input active={true} size="small" />
                )}
              </div>
            </div>
            <div className="">
              <div className="text-[14px] font-bold text-[grey]">
                {labels.department}
              </div>
              <div className="text-[14px] font-bold text-[#526bb1] font-extrabold">
                {careerDetail?.department ? (
                  careerDetail?.department
                ) : (
                  <Skeleton.Input active={true} size="small" />
                )}
              </div>
            </div>
            <div className="">
              <div className="text-[14px] font-bold text-[grey]">
                {labels.educationLevel}
              </div>
              <div className="text-[14px] font-bold text-[#526bb1] font-extrabold">
                {careerDetail?.educationId ? (
                  EducationTypeEnum.map((item) => {
                    if (item.value === careerDetail?.educationId) {
                      return item.label;
                    }
                  })
                ) : (
                  <Skeleton.Input active={true} size="small" />
                )}
              </div>
            </div>
            <div className="">
              <div className="text-[14px] font-bold text-[grey]">
                {labels.endDate}
              </div>
              <div className="text-[14px] font-bold text-[#526bb1] font-extrabold">
                {careerDetail?.endDate ? (
                  moment(careerDetail?.endDate).format("Do MMM YY")
                ) : (
                  <Skeleton.Input active={true} size="small" />
                )}

                {}
              </div>
            </div>
            <div className="">
              <div className="text-[14px] font-bold text-[grey]">
                Interviewers
              </div>
              <div className="text-[14px] font-bold text-[#526bb1] font-extrabold">
                {careerDetail?.interviewers ? (
                  <Avatar
                    isAvatarGroup={true}
                    isTag={false}
                    heading={"users"}
                    membersData={
                      careerDetail?.interviewers
                        ? careerDetail?.interviewers
                        : []
                    }
                    text={"Users"}
                    image={"https://joeschmoe.io/api/v1/random"}
                  />
                ) : (
                  <Skeleton.Input active={true} size="small" />
                )}
              </div>
            </div>
            <div className="">
              <div className="text-[14px] font-bold text-[grey]">
                Minimum Salary
              </div>
              <div className="text-[14px] font-bold text-[#526bb1] font-extrabold">
                {careerDetail?.minSalary ? (
                  careerDetail?.minSalary
                ) : (
                  <Skeleton.Input active={true} size="small" />
                )}
              </div>
            </div>
            <div className="">
              <div className="text-[14px] font-bold text-[grey]">
                Maximum Salary
              </div>
              <div className="text-[14px] font-bold text-[#526bb1] font-extrabold">
                {careerDetail?.maxSalary ? (
                  careerDetail?.maxSalary
                ) : (
                  <Skeleton.Input active={true} size="small" />
                )}
              </div>
            </div>
            <div className="">
              <div className="text-[14px] font-bold text-[grey]">
                {labels.yearOfExperience}
              </div>
              <div className="text-[14px] font-bold text-[#526bb1] font-extrabold">
                {careerDetail?.experience ? (
                  careerDetail?.experience
                ) : (
                  <Skeleton.Input active={true} size="small" />
                )}
              </div>
            </div>
            <div className="">
              <div className="text-[14px] font-bold text-[grey]">
                Post Interviewers
              </div>
              <div className="text-[14px] font-bold text-[#526bb1] font-extrabold">
                {careerDetail?.postInterviewers ? (
                  <Avatar
                    isAvatarGroup={true}
                    isTag={false}
                    heading={"Users"}
                    membersData={
                      careerDetail?.postInterviewers
                        ? careerDetail?.postInterviewers
                        : []
                    }
                    text={"user"}
                    image={"https://joeschmoe.io/api/v1/random"}
                  />
                ) : (
                  <Skeleton.Input active={true} size="small" />
                )}
              </div>
            </div>
          </div>
        </div>
      </SingleItem>
    </>
  );
}

export default ShortDetailCard;
