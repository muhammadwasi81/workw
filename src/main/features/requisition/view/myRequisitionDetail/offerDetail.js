import React, { useContext, useState } from "react";
import moment from "moment";
import "./style.css";
// import { CareerStatusEnum } from "../../utils/enums";
import CommentWrapper from "../../../../sharedComponents/Comment/CommentWrapper";
import Attachments from "../../../travel/view/UI/Attachments";
import CustomModal from "../../../workboard/Modal/CustomModal";
import AttachmentsCarrousel from "../../../travel/view/AttachmentsCarrousel/AttachmentsCarrousel";
import { requisitionDictionaryList } from "../../localization/index";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";

const OfferDetail = (props) => {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { Direction, requisitionDictionary } = requisitionDictionaryList[userLanguage];
  const [isAttachmentModalOpen, setisAttachmentModalOpen] = useState(false);
  
  const {
    name,
    offer,
    email,
    businessAddress,
    businessName,
    createDate,
    status,
    id,
    attachments,
  } = props.data;

//   const { path } = attachments[0];
//   console.log(path);
  return (
    <>
      <div className="item careersQuickDetail OfferQuickDetail">
        <div className="careersShortCard cursor-pointer !flex !flex-row gap-2">
          <div className="flex-1">
            <div className="text-[16px] font-bold text-sky-900">
              {`${name}`}
            </div>
            <div className="text-xs">{email}</div>
          </div>
        </div>
        <div className="mt-4">
          <Attachments
            data={attachments}
            key={{ data: attachments }}
            onClick={() => setisAttachmentModalOpen(true)}
          />
        </div>
        <div className="cardSections mt-10">
          <div className="cardSectionItem">
            <div className="cardSection__title">{requisitionDictionary.Offer}</div>
            <div className="cardSection__body">
              {offer ? `${offer} ` : "-"}
            </div>
          </div>

          <div className="cardSectionItem">
            <div className="cardSection__title">{requisitionDictionary.BusinessName} </div>
            <div className="cardSection__body">
              {businessName ? `${businessName} ` : "-"}
            </div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">{requisitionDictionary.BusinessAddress}</div>
            <div className="cardSection__body">
              {businessAddress ? `${businessAddress} ` : "-"}
            </div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">{requisitionDictionary.AppliedDate}</div>
            <div className="cardSection__body">
              {createDate ? moment(createDate).format("Do MMM YY") : "-"}
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

export default OfferDetail;
