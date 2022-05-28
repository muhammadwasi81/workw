import { Image, Tag } from "antd";
import React, { useContext } from "react";
import { dictionaryList } from "../../../../utils/localization/languages";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import UserInfo from "../../../../components/SharedComponent/UserShortInfo/UserInfo";
import SublineDesigWithTime from "../../../../components/SharedComponent/UserShortInfo/SubLine/DesigWithTime";
import { getNameForImage } from "../../../../utils/base";
import StatusTag from "../../../sharedComponents/Tag/StatusTag";
import RewardDefaultIcon from "../../../../content/svg/menu/rewardIcon.svg";
import moment from "moment";

function ListItem(props) {
	const { userLanguage } = useContext(LanguageChangeContext);
	const { sharedLabels } = dictionaryList[userLanguage];

	const {
		creator,
		name,
		description,
		image = "http://localhost:3000/static/media/rewardIcon.1872d27791f08290da2b85977f16cf07.svg",
		reason,
		category,
		members = [],
		approvers,
		status,
		referenceNo,
		createDate,
	} = props.item;

	// console.log(props.item, "imagessss")
	return (
		<div className="list-item">
			<div
				className="new"
				id={props.id}
				onClick={() => {
					props.getRewardId(props.id);
				}}
			></div>
			<div className={  "item-header"}>
				<div className="left">
					<UserInfo
						avatarSrc={creator.image}
						name={creator.name}
						Subline={
							<SublineDesigWithTime
								designation={creator.designation}
								time={moment(createDate).format('DD/MM/YYYY')}
							/>
						}
					/>
				</div>
				<div className="right">
					<Tag className="IdTag">{referenceNo}</Tag>
					<StatusTag status={status}></StatusTag>
				</div>
			</div>
			<div className="item-content">
				<p>{description}</p>
			</div>
			<div className="ListItemInner">
				<div className="ItemDetails">
					<div className="innerDiv">
						<h3>{sharedLabels.name}</h3>
						<p>{name}</p>
					</div>
					<div className="innerDiv">
						<h3>{sharedLabels.category}</h3>
						<Tag className="IdTag">{category}</Tag>
					</div>
					<div className="innerDiv">
						<h3>{sharedLabels.reason}</h3>
						<p>{reason}</p>
					</div>
					<div className="innerDiv">
						<h3>{sharedLabels.RewardTo}</h3>
						{/* {props.members} */}
						<div className="mem">
							{members.map((val, i) => {
								if (i > 2) return "";
								let { member = { image: "", name: "" } } = val;
								return member && member.image ? (
									<div
										key={`grpmem${i}`}
										className="us-img"
										style={{
											backgroundImage: `url(${member.image})`,
											backgroundRepeat: "no-repeat",
											backgroundSize: "100% 100%",
										}}
									/>
								) : (
									<div key={`grpmem${i}`} className="us-img">
										{getNameForImage(
											member ? member.name : ""
										)}
									</div>
								);
							})}
							{members ? (
								members.length > 2 ? (
									<div className="us-img">
										{members && members.length - 2}+
									</div>
								) : (
									""
								)
							) : null}
						</div>
					</div>
					<div className="approversBox">
						<h3>{sharedLabels.approvers}</h3>
						<div className="mem">
							{approvers.map((val, i) => {
								if (i > 2) return "";
								let { approver } = val;
								return approver.image ? (
									<div
										key={`grpmem${i}`}
										className="us-img"
										style={{
											backgroundImage: `url(${approver.image})`,
											backgroundRepeat: "no-repeat",
											backgroundSize: "100% 100%",
										}}
									/>
								) : (
									<div key={`grpmem${i}`} className="us-img">
										{getNameForImage(approver.name)}
									</div>
								);
							})}
							{approvers ? (
								approvers.length > 2 ? (
									<div className="us-img">
										{approvers && props.approvers - 2}+
									</div>
								) : (
									""
								)
							) : null}
						</div>
					</div>
				</div>
				<div className="attachmentBox">
					<Image
						preview={false}
						width={100}
						src={image === "" ? RewardDefaultIcon : image}
					/>
				</div>
			</div>
		</div>
	);
}

export default ListItem;
