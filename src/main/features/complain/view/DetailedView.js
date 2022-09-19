import React, { useContext, useState } from "react";
import { Drawer, Tag, Button } from "antd";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { complainDictionaryList } from "../localization/index";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import UserInfo from "../../../sharedComponents/UserShortInfo/UserInfo";
import SublineDesigWithTime from "../../../sharedComponents/UserShortInfo/SubLine/DesigWithTime";
import { getNameForImage } from "../../../../utils/base";
import StatusTag from "../../../sharedComponents/Tag/StatusTag";
import DefaultAttachment from "../../../../content/NewContent/complain/DefaultAttachment.svg";
import RemarksApproval from "../../../sharedComponents/AppComponents/Approvals/view";
import Avatar from "../../../sharedComponents/Avatar/avatar";
import moment from "moment";
import {
	ItemContent,
	ItemHeader,
	SingleItem,
} from "../../../sharedComponents/Card/CardStyle";
import { cancelComplain } from "../store/actions";
import {
	ApprovalsModule,
	ApprovalStatus,
} from "../../../sharedComponents/AppComponents/Approvals/enums";
import "./complain.css";
import { useDispatch } from "react-redux";

function DetailedView(props) {
	const { userLanguage } = useContext(LanguageChangeContext);
	const { Direction, complainDictionary } = complainDictionaryList[
		userLanguage
	];
	const { user } = useSelector(state => state.userSlice);
	const { complainDetail } = useSelector(state => state.complainSlice);
	const dispatch = useDispatch();
	const [updatedStatus, setUpdatedStatus] = useState();

	const {
		creator,
		description,
		category,
		createDate,
		status,
		members = [],
		approvers,
	} = complainDetail;
	let { Approved, Declined, Resend } = ApprovalStatus;
	let userId = user.id;

	const isTablet = useMediaQuery({ maxWidth: 800 });

	const handleCancel = (e, payload) => {
		e.preventDefault();
		e.stopPropagation();
		// dispatch(cancelComplain(payload));
	};

	console.log(updatedStatus, "STATUS");

	return (
		<Drawer
			title={
				<h1 style={{ fontSize: "20px", margin: 0 }}>
					{complainDictionary.complain}
				</h1>
			}
			width="768"
			placement={
				(Direction === "ltr" ? "left" : "right",
					isTablet ? "bottom" : "right")
			}
			onClose={props.onClose}
			visible={props.visible}
			className="detailedViewComposer drawerSecondary"
		>
			<div className="detailedCard ComplainListItem">
				<ItemHeader>
					<div className={"item-header"}>
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
							<Tag className="IdTag">TRA-000085</Tag>
							<StatusTag
								status={updatedStatus?.Approvals}
							></StatusTag>
							{userId === creator.id ? (
								status != Declined &&
									status != Resend &&
									status != Approved ? (
									<Button
										className="ThemeBtn"
										onClick={e => handleCancel(e, props.id)}
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
					</div>
				</ItemHeader>
				<ItemContent className="flex description">
					<div className="w-full">
						<p>{description}</p>
					</div>
				</ItemContent>
				<div className="cardSections">
					<div className="cardSectionItem">
						<div className="cardSection__title">{"Category"}</div>
						<div className="cardSection__body">{category}</div>
					</div>
					<div className="cardSectionItem">
						<div className="cardSection__title">{complainDictionary.complainOf}</div>
						<div className="cardSection__body">
							{members &&
								<Avatar
									isAvatarGroup={true}
									isTag={false}
									heading={"Members"}
									membersData={members ? members : []}
									text={"Members"}
									image={"https://joeschmoe.io/api/v1/random"}
								/>
							}
						</div>
					</div>
				</div>
				<RemarksApproval
					module={ApprovalsModule.ComplainApproval}
					status={status}
					onStatusChanged={statusChanged =>
						setUpdatedStatus(statusChanged)
					}
					data={approvers}
					title="Approvals"
				/>
			</div>
		</Drawer>
	);
}

export default DetailedView;
