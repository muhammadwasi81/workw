import { Image, Tag } from "antd";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { SingleItem } from "../../../../sharedComponents/Card/CardStyle";
import { Skeleton } from "antd";
import { getCareerByIdAction } from "../../store/action";
import "../styles/style.css";
import { EducationTypeEnum } from "../../utils/enums";
import moment from "moment";

function ShortDetailCard() {
  const { careerDetail } = useSelector((state) => state.careerSlice);

  console.log(careerDetail); // set these in component

  return (
    <>
      <SingleItem>
        <div className="careersDetailCard">
          <div className="cardLabel">Job DETAILS</div>

          <div className="careersSections">
            <div className="">
              <div className="text-[14px] font-bold text-[grey]">JOB TITLE</div>
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
                CREATED BY
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
              <div className="text-[14px] font-bold text-[grey]">Email</div>
              <div className="text-[14px] font-bold text-[#526bb1] font-extrabold">
                {careerDetail?.creator?.email ? (
                  careerDetail?.creator?.email
                ) : (
                  <Skeleton.Input active={true} size="small" />
                )}
              </div>
            </div>
            <div className="">
              <div className="text-[14px] font-bold text-[grey]">
                DEPARTMENT
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
                EDUCATION LEVEL
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
              <div className="text-[14px] font-bold text-[grey]">END DATE</div>
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
                MINIMUM SALARY
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
                MAXIMUM SALARY
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
                YEAR OF EXPERIENCE
              </div>
              <div className="text-[14px] font-bold text-[#526bb1] font-extrabold">
                {careerDetail?.experience ? (
                  careerDetail?.experience
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
