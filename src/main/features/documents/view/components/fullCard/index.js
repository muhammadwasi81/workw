import React, { useContext, useState } from "react";
import "./style.css";
import {
  ItemHeader,
  SingleItem,
} from "../../../../../sharedComponents/Card/CardStyle";
import UserInfo from "../../../../../sharedComponents/UserShortInfo/UserInfo";
import SublineDesigWithTime from "../../../../../sharedComponents/UserShortInfo/SubLine/DesigWithTime";
import moment from "moment";
import { Button, Tag, Modal } from "antd";
import StatusTag from "../../../../../sharedComponents/Tag/StatusTag";
import { useDispatch } from "react-redux";
import { DOCUMENT_ENUM } from "../../../constant";
import { handleParentId } from "../../../store/slice";
import {
  getDocumentRightLabel,
  getIconByExtensionType,
} from "../../../constant/helpers";
import { LanguageChangeContext } from "../../../../../../utils/localization/localContext/LocalContext";
import { documentDictionaryList } from "../../../localization/index";
import DetailCard from "../detailCard";
import Avatar from "../../../../../sharedComponents/Avatar/avatar";
import DocumentStatusTag from "../documentStatusTag/StatusTag";
import { createGuid } from "../../../../../../utils/base";
import DocShortCard from "../shortCard";
//import MemberModal from "../../../Components/MemberModal";

const DocFullCard = ({ data, handleClickCard, handlePreview }) => {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { documentDictionary } = documentDictionaryList[userLanguage];
  let {
    name,
    documentType,
    creator,
    createDate,
    description,
    id,
    members,
    approvers,
    image,
    extensionTypeId,
    status,
    attachments,
    privacyId,
  } = data;
  let { DUCOMENT_TYPE, MEMBER_RIGHT_TYPE } = DOCUMENT_ENUM;
  let documentFile = attachments[0] ? attachments[0] : {};
  let collaborators = members.filter(
    (it) => it.memberRightType === MEMBER_RIGHT_TYPE.COLLABRATOR
  );
  let readers = members.filter(
    (it) => it.memberRightType === MEMBER_RIGHT_TYPE.READER
  );
  documentFile = {
    ...documentFile,
    documentType,
  };

  return (
    <>
      <SingleItem onClick={() => handleClickCard(id)}>
        <ItemHeader>
          <div className="left">
            <UserInfo
              avatarSrc={creator.image}
              name={creator.name}
              Subline={
                <SublineDesigWithTime
                  designation={creator.designation ? creator.designation : ""}
                  time={moment(createDate).fromNow()}
                />
              }
            />
          </div>
          <div className="right">
            {/* <Tag className="IdTag">{referenceNo}</Tag> */}
            <DocumentStatusTag status={status}></DocumentStatusTag>
          </div>
        </ItemHeader>
        {/* <div className="description w-full pt-3 pb-5 h-[100px]">
					{description.length > 0 ? (
						<p>{description}</p>
					) : (
						<p> No description </p>
					)}
				</div> */}
        {/* <div className="" >
					<DocShortCard
						data={attachments[0]}
						handlePreview={() => { }}
						key={createGuid()}
					/>
				</div> */}
        <div className="doc_detail_media">
          <DocShortCard
            data={documentFile}
            handlePreview={handlePreview}
            key={createGuid()}
            hideControls={true}
          />
          </div>

        <div className="cardSections">
          <div className="cardSectionItem">
            <div className="cardSection__title">Create Date</div>
            <div className="cardSection__body">
              {moment().format("Do MMM YY")}
            </div>
          </div>

          <div className="cardSectionItem">
            <div className="cardSection__title">Readers</div>
            <div className="cardSection__body">
              {privacyId === 1 ? (
                "Public"
              ) : readers.length > 0 ? (
                <Avatar
                  isAvatarGroup={true}
                  heading={"members"}
                  membersData={readers ? readers : []}
                />
              ) : (
                "Not Available"
              )}
            </div>
          </div>

          <div className="cardSectionItem">
            <div className="cardSection__title">
              {getDocumentRightLabel(documentType)}
            </div>
            <div className="cardSection__body">
            
            {/* members={
              members &&
              <>
                 <div className="members"> 
											<Avatar
												className="MembersList"
												isAvatarGroup={true}
												isTag={false}
												heading={"members"}
                        membersData={collaborators ? collaborators : []}
												text={"Members"}
												image={"https://joeschmoe.io/api/v1/random"}
											/>
                      
                      <div className="addMemberBtn">+ </div>
											<div className="addMemberBtn" 
                          onClick={() => 
                          disptach(addMember({status: true, type: MemberEnum.ebook}))} >+</div>

										   </div>
                       <MemberModal />
               </>
            } */}
              {collaborators.length > 0 ? (
                <Avatar
                  isAvatarGroup={true}
                  heading={"members"}
                  membersData={collaborators ? collaborators : []}
                />
              ) : (
                "Not Available"
              )}

            </div>
          </div>

          <div className="cardSectionItem">
            <div className="cardSection__title">Approvers</div>
            <div className="cardSection__body">
              {approvers.length > 0 ? (
                <Avatar
                  isAvatarGroup={true}
                  heading={"approvers"}
                  membersData={approvers ? approvers : []}
                />
              ) : (
                "Not Available"
              )}
            </div>
          </div>
        </div>
      </SingleItem>
    </>
  );
};

export default DocFullCard;
