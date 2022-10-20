import React, { useState, useContext } from "react";
import moment from "moment";
import "./style.css";
import { CareerStatusEnum } from "../../utils/enums";
import CommentWrapper from "../../../../sharedComponents/Comment/CommentWrapper";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
import { CareerDictionary } from "../../localization";
import Attachments from "../../../travel/view/UI/Attachments";
import CustomModal from "../../../workboard/Modal/CustomModal";
import AttachmentsCarrousel from "../../../travel/view/AttachmentsCarrousel/AttachmentsCarrousel";

const ApplicantDetail = (props) => {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { CareerDictionaryList, Direction } = CareerDictionary[userLanguage];
  const { labels } = CareerDictionaryList;
  const [isAttachmentModalOpen, setisAttachmentModalOpen] = useState(false);
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
    attachments,
  } = props.data;

  // const { path } = attachments[0];
  // console.log(path);
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
          {/* <a href={path} target="_blank">
            Download Resume
          </a> */}

          <Attachments
            data={attachments}
            key={{ data: attachments }}
            onClick={() => setisAttachmentModalOpen(true)}
          />
        </div>
        <div className="cardSections mt-10">
          <div className="cardSectionItem">
            <div className="cardSection__title">{labels.expectedSalary} </div>
            <div className="cardSection__body">
              {expectedSalary ? `${expectedSalary} ` : "-"}
            </div>
          </div>

          <div className="cardSectionItem">
            <div className="cardSection__title">{labels.currentSalary}</div>
            <div className="cardSection__body">
              {currentSalary ? `${currentSalary} ` : "-"}
            </div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">{labels.appliedDate}</div>
            <div className="cardSection__body">
              {createDate ? moment(createDate).format("Do MMM YY") : "-"}
            </div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">{labels.experience}</div>
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
      <div
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <CustomModal
          isModalVisible={isAttachmentModalOpen}
          footer={null}
          width={"80%"}
          className="attachmentModal"
          onCancel={() => setisAttachmentModalOpen(false)}
          children={
            <AttachmentsCarrousel
              attachments={attachments}
              key={{ data: attachments }}
            />
          }
        />
      </div>
    </>
  );
};

export default ApplicantDetail;
