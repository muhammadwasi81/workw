import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import UserInfo from "../../../sharedComponents/UserShortInfo/UserInfo";
import { Tag } from "antd";
import SublineDesigWithTime from "../../../sharedComponents/UserShortInfo/SubLine/DesigWithTime";
import StatusTag from "../../../sharedComponents/Tag/StatusTag";
import Avatar from "../../../sharedComponents/Avatar/avatar";
import moment from "moment";
import RemarksApproval from "../../../sharedComponents/AppComponents/Approvals/view";
import {
	ApprovalsModule,
	ApprovalStatus,
} from "../../../sharedComponents/AppComponents/Approvals/enums";
import { promotionDictionaryList } from "../localization";

import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";

import { useDispatch } from "react-redux";
import { GetPromotionById } from "../store/actions";

function PromotionDetail(props) {
	const dispatch = useDispatch();
	const { id } = props;
	const [updatedStatus, setUpdatedStatus] = useState();
	const { promotionDetail } = useSelector(state => state.promotionSlice);
	const { userLanguage } = useContext(LanguageChangeContext);
	const { Direction, promotionDictionary } = promotionDictionaryList[
		userLanguage
	];

	useEffect(() => {
		dispatch(GetPromotionById(id));
	}, [id]);

	const {
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
	return (
		<div className="detailedCard ">
			<div className="item-header">
				<div className="left">
					<UserInfo
						avatarSrc={promotionDetail?.creator.image}
						name={promotionDetail?.creator.name}
						Subline={
							<SublineDesigWithTime
								designation={
									promotionDetail?.creator.designation
										? promotionDetail?.creator.designation
										: ""
								}
								time={moment(
									promotionDetail?.createDate
								).fromNow()}
							/>
						}
					/>
				</div>
				<div className="right">
					<Tag className="IdTag">TRA-000085</Tag>
					<StatusTag status={updatedStatus?.Approvals}></StatusTag>
				</div>
			</div>
			<div className="item-content">
				<p>{promotionDetail?.description}</p>
			</div>
			<div className="cardSections" style={{ marginTop: "10px" }}>
				<div className="cardSectionItem">
					<div className="cardSection__title">{"New Grade"}</div>
					<div className="cardSection__body">
						<Tag className="IdTag">
							{promotionDetail?.grade
								? promotionDetail?.grade
								: "Default Grade"}
						</Tag>
					</div>
				</div>
				<div className="cardSectionItem">
					<div className="cardSection__title">
						{promotionDictionary.promotionTo}
					</div>
					<div className="cardSection__body">
						{promotionDetail?.member &&
							promotionDetail?.member.name}
					</div>
				</div>
				<div className="cardSectionItem">
					<div className="cardSection__title">
						{promotionDictionary.approvers}
					</div>
					<div className="cardSection__body">
						{promotionDetail?.approvers && (
							<Avatar
								isAvatarGroup={true}
								isTag={false}
								heading={"Approvers"}
								membersData={promotionDetail?.approvers}
								text={"Approvers"}
							/>
						)}
					</div>
				</div>
			</div>
			<RemarksApproval
				module={ApprovalsModule.RewardApproval}
				status={promotionDetail?.status}
				onStatusChanged={statusChanged =>
					setUpdatedStatus(statusChanged)
				}
				data={promotionDetail?.approvers}
				title="Approvals"
			/>
		</div>
	);
}

export default PromotionDetail;
