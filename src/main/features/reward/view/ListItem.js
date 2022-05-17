import { Image, Tag } from "antd";
import React, { useContext } from "react";
import { dictionaryList } from "../../../../utils/localization/languages";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import Approval from "../../../../components/SharedComponent/AppComponents/Approval/Approval";
import UserInfo from "../../../../components/SharedComponent/UserShortInfo/UserInfo";
import SublineDesigWithTime from "../../../../components/SharedComponent/UserShortInfo/SubLine/DesigWithTime";
import { getNameForImage } from "../../../../utils/base";

const dummyMember = [
	{
		profile_picture:
			"https://konnect.im/upload/2021/3/5325454b-1c5d-40f1-b95d-df0fad2d4da9.jpeg",
		name: "Abu Bakar",
	},
	{
		profile_picture:
			"https://konnect.im/upload/2021/3/5325454b-1c5d-40f1-b95d-df0fad2d4da9.jpeg",
		name: "Abu Bakar",
	},
	{
		profile_picture:
			"https://konnect.im/upload/2021/3/5325454b-1c5d-40f1-b95d-df0fad2d4da9.jpeg",
		name: "Abu Bakar",
	},
	{
		profile_picture:
			"https://konnect.im/upload/2021/3/5325454b-1c5d-40f1-b95d-df0fad2d4da9.jpeg",
		name: "Abu Bakar",
	},
	{
		profile_picture:
			"https://konnect.im/upload/2021/3/5325454b-1c5d-40f1-b95d-df0fad2d4da9.jpeg",
		name: "Abu Bakar",
	},
];

function RewardListItem(props) {
	const { userLanguage } = useContext(LanguageChangeContext);
	const { sharedLabels, Direction } = dictionaryList[userLanguage];

	return (
		<div className="list-item">
			<div className="new" id={props.id} onClick={props.getRewardId}>

			</div>
			<div className="item-header">
				<div className="left">
					<UserInfo
						avatarSrc="https://konnect.im/upload/2021/3/5325454b-1c5d-40f1-b95d-df0fad2d4da9.jpeg"
						name={props.name}
						Subline={
							<SublineDesigWithTime
								designation={"ReactJs Developer"}
								time="2 days ago"
							/>
						}
					/>
				</div>
				<div className="right">
					<Tag className="IdTag">TRA-000085</Tag>
					{props.status}
				</div>
			</div>
			<div className="item-content">
				<p>{props.description}</p>
			</div>
			<div className="ListItemInner">
				<div className="ItemDetails">
					<div className="innerDiv">
						<h3>Name</h3>
						<p>{props.name}</p>
					</div>
					<div className="innerDiv">
						<h3>category</h3>
						<Tag className="IdTag">{props.category}</Tag>
					</div>
					<div className="innerDiv">
						<h3>Reason</h3>
						<p>{props.reason}</p>
					</div>
					<div className="innerDiv">
						<h3>Reward To</h3>
						{props.members}
						<div className="mem">
							{dummyMember.map((val, i) => {
								if (i > 2) return "";
								return val.profile_picture ? (
									<div
										key={`grpmem${i}`}
										className="us-img"
										style={{
											backgroundImage: `url(${val.profile_picture})`,
											backgroundRepeat: "no-repeat",
											backgroundSize: "100% 100%",
										}}
									/>
								) : (
									<div key={`grpmem${i}`} className="us-img">
										{getNameForImage(val.name)}
									</div>
								);
							})}
							{dummyMember ? (
								dummyMember.length > 2 ? (
									<div className="us-img">
										{dummyMember && dummyMember.length - 2}+
									</div>
								) : (
									""
								)
							) : null}
						</div>
					</div>
					<div className="approversBox">
						<h3>Approvers</h3>
						<div className="mem">
							{dummyMember.map((val, i) => {
								if (i > 2) return "";
								return val.profile_picture ? (
									<div
										key={`grpmem${i}`}
										className="us-img"
										style={{
											backgroundImage: `url(${val.profile_picture})`,
											backgroundRepeat: "no-repeat",
											backgroundSize: "100% 100%",
										}}
									/>
								) : (
									<div key={`grpmem${i}`} className="us-img">
										{getNameForImage(val.name)}
									</div>
								);
							})}
							{dummyMember ? (
								dummyMember.length > 2 ? (
									<div className="us-img">
										{dummyMember && dummyMember.length - 2}+
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
						width={100}
						src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
					/>
				</div>
			</div>
			{/* <div className="warning-approvers">
            <Approval 
                username={props.approverName}
                userdesignation={props.approverDesignation}
                status="In Progress"   
            />
      </div> */}
		</div>
	);
}

export default RewardListItem;
