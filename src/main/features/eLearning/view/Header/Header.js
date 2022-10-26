import React from "react";
import LayoutHeader from "../../../../layout/header";
import CreateLearningDropdown from "../../components/createLearningDropdown";

function Header({ dictionary, direction }) {
	const items = [
		{
			name: "Dashboard",
			to: `/eLearning`,
			renderButton: [1],
		},
		{
			name: "Team Dashboard",
			to: `/eLearning/teamDashboard`,
			renderButton: [1],
		},
		{
			name: "Summary",
			to: `/eLearning/summary`,
			renderButton: [1],
		},
	];

	const buttons = [
		{
			render: <CreateLearningDropdown />,
		},
	];
	return <LayoutHeader backButton={false} items={items} buttons={buttons} />;
}

export default Header;
