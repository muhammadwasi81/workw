import React, { useEffect, useContext, useState } from "react";
import { Button, Drawer, Tag, Skeleton } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { warningDictionaryList } from "../localization/index";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import UserInfo from "../../../sharedComponents/UserShortInfo/UserInfo";
import SublineDesigWithTime from "../../../sharedComponents/UserShortInfo/SubLine/DesigWithTime";
import StatusTag from "../../../sharedComponents/Tag/StatusTag";
import DefaultAttachment from "../../../../content/NewContent/warning/warningsDefaultAttachment.svg";
import Avatar from "../../../sharedComponents/Avatar/avatar";
import moment from "moment";
import {
	ItemContent,
	ItemHeader,
} from "../../../sharedComponents/Card/CardStyle";
import RemarksApproval from "../../../sharedComponents/AppComponents/Approvals/view";
import {
	ApprovalsModule,
	ApprovalStatus,
} from "../../../sharedComponents/AppComponents/Approvals/enums";
import { GetWarningById } from "../store/actions";

function DetailCard(props) {
	const dispatch = useDispatch();
	const { userLanguage } = useContext(LanguageChangeContext);
	const {
		sharedLabels,
		Direction,
		complainDictionary,
		warningDictionary,
	} = warningDictionaryList[userLanguage];
	const [updatedStatus, setUpdatedStatus] = useState(null);
	const { user } = useSelector(state => state.userSlice);

	let userId = user.id;

	const { warningDetail, loadingData } = useSelector(
		state => state.warningSlice
	);
	let {
		InProcess,
		Approved,
		Declined,
		Resend,
		Inactive,
		NotRequired,
		Cancelled,
		ApprovalRequired,
		Hold,
		NoStatus,
	} = ApprovalStatus;

	const {
		creator,
		description,
		image = DefaultAttachment,
		category,
		status,
		createDate,
		members = [],
		approvers,
		referenceNo,
		id,
	} = warningDetail;

	useEffect(() => {
		props.id && dispatch(GetWarningById(props.id));
	}, [props.id]);

	if (loadingData) return <Skeleton />;
	console.log("loadinggdataaaa", loadingData);
	return (
		<div className="detailedCard ">
			<ItemHeader>
				<div className="left">
					<UserInfo
						avatarSrc={creator.image}
						name={creator.name}
						Subline={
							<SublineDesigWithTime
								designation={
									creator.designation
										? creator.designation
										: ""
								}
								time={moment(createDate).fromNow()}
							/>
						}
					/>
				</div>
				<div className="right">
					<Tag className="IdTag">{referenceNo}</Tag>
					<StatusTag status={status}></StatusTag>
					{userId === creator.id ? (
						status != Declined &&
						status != Resend &&
						status != Approved ? (
							<Button
								className="ThemeBtn"
								onClick={e => handleCancel(e, id)}
							>
								Cancel
							</Button>
						) : (
							""
						)
					) : (
						""
					)}
				</div>
			</ItemHeader>
			<ItemContent className="flex">
				<div className="description w-full">
					<p>{description}</p>
				</div>
			</ItemContent>
			<div className="cardSections">
				<div className="cardSectionItem">
					<div className="cardSection__title">
						{warningDictionary.category}
					</div>
					<div className="cardSection__body">
						<Tag className="IdTag">
							{category ? category : "Default Category"}
						</Tag>
					</div>
				</div>
				<div className="cardSectionItem">
					<div className="cardSection__title">
						{warningDictionary.warningTo}
					</div>
					<div className="cardSection__body">
						{members && (
							<Avatar
								isAvatarGroup={true}
								isTag={false}
								heading={"Members"}
								membersData={members}
								text={"Members"}
								image={"https://joeschmoe.io/api/v1/random"}
							/>
						)}
					</div>
				</div>
				<div className="cardSectionItem">
					<div className="cardSection__title">
						{warningDictionary.approvers}
					</div>
					<div className="cardSection__body">
						{approvers && (
							<Avatar
								isAvatarGroup={true}
								isTag={false}
								heading={"Approvers"}
								membersData={approvers}
								text={"Approvers"}
								image={"https://joeschmoe.io/api/v1/random"}
							/>
						)}
					</div>
				</div>
			</div>
			<RemarksApproval
				module={ApprovalsModule.WarningApproval}
				status={status}
				onStatusChanged={statusChanged => {
					setUpdatedStatus(statusChanged);
					console.log(statusChanged);
				}}
				data={approvers}
				title="Approvers"
			/>
			{/* <RemarksApproval data={approvers} title="Approvals" /> */}
		</div>
	);
}

export default DetailCard;
