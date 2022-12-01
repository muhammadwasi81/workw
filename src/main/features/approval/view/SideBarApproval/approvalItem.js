import moment from "moment";
import React from "react";
import Avatar from "../../../../sharedComponents/Avatar/avatarOLD";
// import Avatar from "../../../../sharedComponents/Avatar/avatarOLD";
import "../style.css";

export default function ApprovalItem({ item, handleApprovalDetail = () => { } }) {
	let {
		creator,
		updateDate,
		message
	} = item;
	let notiTime = moment.utc(updateDate).local().fromNow();

	return (
		<div
			className="approval_item cursor-pointer"
			onClick={() => handleApprovalDetail(item)}>
			<div>
				<Avatar
					src={creator?.image}
					name={creator?.name}
					size={35}
					round={true}
				// active={true}
				/>
			</div>
			<div className="approval_item_detail">
				<div className="approval_item_detail_child1">
					{creator?.name}
					{message}
				</div>
				<div className="approval_item_detail_child2">
					<div className="dateTime">
						<div className="shortDesc">
							{notiTime}
						</div>
						<div className="shortDesc">TRA-00000012</div>
					</div>
					<div className="approval_item_status">
						<div className="accept">Accept</div>
						<div className="decline">Decline</div>
						<div className="hold">Hold</div>
					</div>
				</div>
			</div>
		</div>
	);
}
