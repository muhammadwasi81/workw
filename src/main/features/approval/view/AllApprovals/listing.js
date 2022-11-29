import React from "react";
import { useSelector } from "react-redux";
import Tab from "../../../../sharedComponents/Tab";
import ApprovalItem from "../SideBarApproval/approvalItem";

const panes = [
	{
		featureName: `In Progress`,
		content: <div></div>,
		featureId: 0,
	},
	{
		featureName: `Accepted`,
		content: <div></div>,
		featureId: 1,
	},
	{
		featureName: `Declined`,
		content: <div></div>,
		featureId: 2,
	},
	{
		featureName: `Hold`,
		content: <div></div>,
		featureId: 3,
	},
];

const approvals = [
	{
		type: 1,
		id: 1,
	},
	{
		type: 2,
		id: 2,
	},
	{
		type: 3,
		id: 3,
	},
	{
		type: 4,
		id: 4,
	},
	{
		type: 5,
		id: 5,
	},
	{
		type: 6,
		id: 6,
	},
	{
		type: 7,
		id: 7,
	},
	{
		type: 8,
		id: 8,
	},
	{
		type: 9,
		id: 9,
	},
];

export default function Listing({ handleApprovalDetail }) {
const approvalList = useSelector(state => state.approvalSlice.approvalList);

	return (
		<>
			<Tab panes={panes} />
			<div className="overflow-scroll h-[85vh]">
				{approvalList.map(item => (
					<ApprovalItem
						item={item}
						handleApprovalDetail={handleApprovalDetail}
					/>
				))}
			</div>
		</>
	);
}
