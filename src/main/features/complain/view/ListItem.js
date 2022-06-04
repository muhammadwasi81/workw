import { Tag } from "antd";
import React, { useContext } from "react";
import {complainDictionaryList} from "../localization/index";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import UserInfo from "../../../sharedComponents/UserShortInfo/UserInfo";
import SublineDesigWithTime from "../../../sharedComponents/UserShortInfo/SubLine/DesigWithTime";
import { getNameForImage } from "../../../../utils/base";
import StatusTag from "../../../sharedComponents/Tag/StatusTag";

function ListItem(props) {
	const { userLanguage } = useContext(LanguageChangeContext);
	const { Direction, complainDictionary } = complainDictionaryList[userLanguage];

	const {
		creator,
		description,
		category,
		members = [],
		approvers,
		status,
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
			/>
			<div className={"item-header"}>
				<div className="left">
					<UserInfo
						avatarSrc={creator.image}
						name={creator.name}
						Subline={
							<SublineDesigWithTime
								designation={creator.designation}
								time="7 days ago"
							/>
						}
					/>
				</div>
				<div className="right">
					<Tag className="IdTag">TRA-000085</Tag>
					<StatusTag status={status}></StatusTag>
				</div>
			</div>
			<div className="item-content">
				<p>{description}</p>
			</div>
			<div className="ListItemInner">
				<div className="ItemDetails">
					<div className="innerDiv">
						<h3>{complainDictionary.category}</h3>
						<Tag className="IdTag">{category}</Tag>
					</div>
					<div className="innerDiv">
						<h3>{complainDictionary.complainOf}</h3>
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
						<h3>{complainDictionary.approvers}</h3>
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
			</div>
		</div>
	);
}

export default ListItem;
