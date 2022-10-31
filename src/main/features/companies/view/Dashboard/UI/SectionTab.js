import React from "react";
import Tab from "../../../../../sharedComponents/Tab";
import "../../../styles/dashboard.css";
function SectionTab() {
	const panes = [
		{
			featureName: "Courses",
			featureId: 0,
			content: "Courses",
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
	return <Tab panes={panes} className={"elearning-dashboard__tab"} />;
}

export default SectionTab;
