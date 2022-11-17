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
import OverAllDashboard from "./Sections/overAll";
import { ContBody, TabbableContainer } from "../../../../sharedComponents/AppComponents/MainFlexContainer";
import Header from "../Header/Header";

function MainDashboard() {
	const panes = [
		{
			featureName: "Overall",
			featureId: 6,
			content: <OverAllDashboard />,
		},
		{
			featureName: "Users",
			featureId: 0,
			content: <Courses />,
		},
		{
			featureName: "Posts",
			featureId: 1,
			content: <Ebooks />,
		},
		{
			featureName: "Documents",
			featureId: 2,
			content: <Quizes />,
		},
		{
			featureName: "Expenses",
			featureId: 3,
			content: <TedTalk />,
		},
		{
			featureName: "Projects",
			featureId: 4,
			content: <Article />,
		},
		{
			featureName: "Tasks",
			featureId: 5,
			content: <Videos />,
		},
	];
	return (
		<TabbableContainer>
			<Header />
			<ContBody>
				<div className="overflow-hidden flex flex-col gap-3">
					<DashboardOverview />
					<Tab panes={panes} className={"elearning-dashboard__tab"} />
				</div>
			</ContBody>
		</TabbableContainer>
	);
}

export default MainDashboard;
