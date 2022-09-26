import React from "react";
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

export default function Listing() {
	return (
		<>
			<Tab panes={panes} />
			<div className="overflow-scroll h-[85vh]">
				{Array(100)
					.fill({
						type: 1,
						refrenceId: "9fb567fa-7a1e-4317-974b-ff59540ce4f9",
					})
					.map(item => (
						<ApprovalItem item={item} />
					))}
			</div>
		</>
	);
}
