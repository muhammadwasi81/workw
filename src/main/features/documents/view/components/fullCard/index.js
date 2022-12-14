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
import { getDocumentRightLabel, getIconByExtensionType } from "../../../constant/helpers";
import { LanguageChangeContext } from "../../../../../../utils/localization/localContext/LocalContext";
import { documentDictionaryList } from "../../../localization/index";
import DetailCard from "../detailCard";
import Avatar from "../../../../../sharedComponents/Avatar/avatar";
import DocumentStatusTag from "../documentStatusTag/StatusTag";
import { createGuid } from "../../../../../../utils/base";
import DocShortCard from "../shortCard";

const DocFullCard = ({ data, handleClickCard }) => {
	const { userLanguage } = useContext(LanguageChangeContext);
	const { documentDictionary } = documentDictionaryList[userLanguage];
	let {
		name,
		documentType,
		creator,
		createDate,
		description, id, members, approvers, image, extensionTypeId, status, attachments } = data
	let { DUCOMENT_TYPE, MEMBER_RIGHT_TYPE } = DOCUMENT_ENUM;
	let documentFile = attachments[0] ? attachments[0] : {};
	let collaborators = members.filter(it => it.memberRightType === MEMBER_RIGHT_TYPE.COLLABRATOR);
	let readers = members.filter(it => it.memberRightType === MEMBER_RIGHT_TYPE.READER);
	documentFile = {
		...documentFile,
		documentType
	}

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
									designation={creator.designation ? creator.designation : ''}
									time={moment(createDate).fromNow()}
								/>}
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
						handlePreview={() => { }}
						key={createGuid()}
						hideControls={true}
					/>
					<div className="downloadBtn">
						{
							documentType === DUCOMENT_TYPE.attachment ?
								<Button className="ThemeBtn downloadBtn">{documentDictionary.Download}</Button> : ""
						}
					</div>
				</div>

				<div className="cardSections">

					<div className="cardSectionItem">
						<div className="cardSection__title">Create Date</div>
						<div className="cardSection__body">
							{moment().format('Do MMM YY')}
						</div>
					</div>

					<div className="cardSectionItem">
						<div className="cardSection__title">Readers</div>
						<div className="cardSection__body">{"Public"}</div>
					</div>

					<div className="cardSectionItem">
						<div className="cardSection__title">{getDocumentRightLabel(documentType)}</div>
						<div className="cardSection__body">
							{approvers.length > 0 ?
								<Avatar
									isAvatarGroup={true}
									heading={'approvers'}
									membersData={approvers ? approvers : []}
								/> :
								"N/A"}
						</div>
					</div>

					<div className="cardSectionItem">
						<div className="cardSection__title">Approvers</div>
						<div className="cardSection__body">
							{approvers.length > 0 ?
								<Avatar
									isAvatarGroup={true}
									heading={'approvers'}
									membersData={approvers ? approvers : []}
								/> :
								"N/A"}
						</div>
					</div>

				</div>
			</SingleItem>
		</>
	);
};

export default DocFullCard;
