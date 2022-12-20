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


export default function Listing({ handleApprovalDetail }) {
const approvalList = useSelector(state => state.approvalSlice.approvalList);

	return (
		<>
			<Tab
			canChangeRoute={true} 
			panes={panes}
			onChange={(e)=>console.log(e)} />
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
