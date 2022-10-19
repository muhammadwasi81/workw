import React from "react";
import moment from "moment";
import "./style.css";
import { CareerStatusEnum } from "../../utils/enums";
import CommentWrapper from "../../../../sharedComponents/Comment/CommentWrapper";

const ApplicantDetail = (props) => {
  console.log(props);
  const {
    firstName,
    lastName,
    email,
    expectedSalary,
    experience,
    createDate,
    currentSalary,
    status,
    id,
  } = props.data;
  return (
    <>
      <div className="item careersQuickDetail">
        <div className="careersShortCard cursor-pointer !flex !flex-row gap-2">
          <div className="flex-1">
            <div className="text-[16px] font-bold text-sky-900">
              {`${firstName} ${lastName}`}
            </div>
            <div className="text-xs">{email}</div>
          </div>
          <div className="text-[16px] text-m text-sky-900">
            {CareerStatusEnum.map((item) => {
              if (item.value === status) {
                return item.label;
              }
            })}
          </div>
        </div>
        <div className="mt-4">
          <a href={""} target="_blank">
            Download Resume
          </a>
        </div>
        <div className="cardSections mt-10">
          <div className="cardSectionItem">
            <div className="cardSection__title">Expected Salary </div>
            <div className="cardSection__body">
              {expectedSalary ? `${expectedSalary} ` : "-"}
            </div>
          </div>

          <div className="cardSectionItem">
            <div className="cardSection__title">Current Salary </div>
            <div className="cardSection__body">
              {currentSalary ? `${currentSalary} ` : "-"}
            </div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">Applied Data Date</div>
            <div className="cardSection__body">
              {createDate ? moment(createDate).format("Do MMM YY") : "-"}
            </div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">Experience</div>
            <div className="cardSection__body">
              {experience ? experience : "-"}
            </div>
          </div>
        </div>
        <div className="mt-4">
          <CommentWrapper
            initailComments={[]}
            referenceId={id}
            module={2}
            isCommentLoad={true}
          />
        </div>
      </div>
    </>
  );
};

export default ApplicantDetail;
