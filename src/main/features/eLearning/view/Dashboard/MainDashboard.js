import React from "react";
import DashboardOverview from "./UI/DashboardOverview";
import Tab from "../../../../sharedComponents/Tab";
import "../../styles/dashboard.css";
import Courses from "./Courses/Courses";

function MainDashboard() {
	const panes = [
		{
			featureName: "Courses",
			featureId: 0,
			content: <Courses />,
		},
		{
			featureName: "eBooks",
			featureId: 1,
			content: "ebook",
		},
		{
			featureName: "Quizzes",
			featureId: 2,
			content: "Quizzes",
		},
		{
			featureName: "TedTalks",
			featureId: 3,
			content: "TedTalks",
		},
		{
			featureName: "Articles",
			featureId: 4,
			content: "articles",
		},
		{
			featureName: "Videos",
			featureId: 5,
			content: "videos",
		},
	];
	return (
		<div className="overflow-hidden flex flex-col gap-3">
			<DashboardOverview />
			<Tab panes={panes} className={"elearning-dashboard__tab"} />
		</div>
	);
}

export default MainDashboard;
