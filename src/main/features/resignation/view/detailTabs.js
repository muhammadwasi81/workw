import React, { useContext, useEffect } from "react";
import Tab from "../../../sharedComponents/Tab";
import Loan from "../../team/view/Loan";
import Warnings from "../../team/view/Warnings";
import Rewards from "../../team/view/Rewards";
import Courses from "../../team/view/Courses";
import "./style.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";



function DetailTabs({detailId,RemarksApproval }) {
	
	const { user } = useSelector((state) => state.userSlice);
	const userId = user.id;
	console.log("userIduserId",userId);

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
			content: <Loan userId={userId} />,
		},
		{
			featureId: 2,
			featureName: "Warnings",
			content: <Warnings userId={userId} />,
		},
		{
			featureId: 3,
			featureName: "Rewards",
			content: <Rewards userId={userId} />,
		},
		{
			featureId: 4,
			featureName: "Courses",
			content: <Courses userId={userId} />,
		},
	];
	return (
		<div className="detailTabs">
			<Tab panes={panes} />
		</div>
	);
}

export default DetailTabs;
