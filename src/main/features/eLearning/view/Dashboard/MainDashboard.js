import React from "react";
import DashboardOverview from "./UI/DashboardOverview";
import Tab from "../../../../sharedComponents/Tab";
import "../../styles/dashboard.css";
import Courses from "./Sections/Courses/Courses";
import Ebooks from "./Sections/Ebooks/Ebooks";
import Quizes from "./Sections/Quizes/Quizes";
import TedTalk from "./Sections/TedTalks/TedTalk";
import Article from "./Sections/Articles/Article";
import Videos from "./Sections/Videos/Videos";

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
			content: <Ebooks />,
		},
		{
			featureName: "Quizzes",
			featureId: 2,
			content: <Quizes />,
		},
		{
			featureName: "TedTalks",
			featureId: 3,
			content: <TedTalk />,
		},
		{
			featureName: "Articles",
			featureId: 4,
			content: <Article />,
		},
		{
			featureName: "Videos",
			featureId: 5,
			content: <Videos />,
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
