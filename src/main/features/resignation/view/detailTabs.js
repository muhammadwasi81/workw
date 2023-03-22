import React, { useContext, useEffect } from "react";
import Tab from "../../../sharedComponents/Tab";
import Loan from "../../team/view/Loan";
import Warnings from "../../team/view/Warnings";
import Rewards from "../../team/view/Rewards";
import Courses from "../../team/view/Courses";
import "./style.css";

function DetailTabs({ detailId, RemarksApproval }) {
	const { TabPane } = Tab;
	const panes = [
		{
			featureId: 0,
			featureName: "Approvers",
			content: RemarksApproval,
		},
		{
			featureId: 1,
			featureName: "Loans",
			content: <Loan userId={detailId} />,
		},
		{
			featureId: 2,
			featureName: "Warnings",
			content: <Warnings userId={detailId} />,
		},
		{
			featureId: 3,
			featureName: "Rewards",
			content: <Rewards userId={detailId} />,
		},
		{
			featureId: 4,
			featureName: "Courses",
			content: <Courses userId={detailId} />,
		},
	];
	return (
		<div className="detailTabs">
			<Tab panes={panes} />
		</div>
	);
}

export default DetailTabs;
