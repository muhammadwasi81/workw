import { Avatar, Image, Tag, Tooltip } from "antd";
import React, { useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import { SingleItem } from "../../../../sharedComponents/Card/CardStyle";
import { Skeleton } from "antd";

import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
import { CareerDictionary } from "../../localization";
import { getCareerByIdAction } from "../../store/action";
import "../styles/style.css";
import { EducationTypeEnum } from "../../utils/enums";
import moment from "moment";

function ShortDetailCard() {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { CareerDictionaryList, Direction } = CareerDictionary[userLanguage];
  const { careerDetail } = useSelector((state) => state.careerSlice);
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
                {careerDetail?.designation ? (
                  careerDetail?.designation
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
                  <Avatar.Group maxCount={2}>
                    {careerDetail?.approvers &&
                      careerDetail?.approvers.map((el, i) => {
                        return (
                          <>
                            <Tooltip title={el.approver?.name} placement="top">
                              <Avatar
                                src={
                                  el.approver?.image
                                    ? el.approver?.image
                                    : "https://joeschmoe.io/api/v1/random"
                                }
                              />
                            </Tooltip>
                          </>
                        );
                      })}
                  </Avatar.Group>
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
                  <Avatar.Group maxCount={2}>
                    {careerDetail?.interviewers &&
                      careerDetail?.interviewers.map((el, i) => {
                        return (
                          <>
                            <Tooltip title={el.user?.name} placement="top">
                              <Avatar
                                src={
                                  el.user?.image
                                    ? el.user?.image
                                    : "https://joeschmoe.io/api/v1/random"
                                }
                              />
                            </Tooltip>
                          </>
                        );
                      })}
                  </Avatar.Group>
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
                  <Avatar.Group maxCount={2}>
                    {careerDetail?.postInterviewers &&
                      careerDetail?.postInterviewers.map((el, i) => {
                        return (
                          <>
                            <Tooltip title={el.user.name} placement="top">
                              <Avatar
                                src={
                                  el.user?.image
                                    ? el.user?.image
                                    : "https://joeschmoe.io/api/v1/random"
                                }
                              />
                            </Tooltip>
                          </>
                        );
                      })}
                  </Avatar.Group>
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
