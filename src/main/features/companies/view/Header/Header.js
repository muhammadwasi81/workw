import React from "react";
import LayoutHeader from "../../../../layout/header";
import CreateLearningDropdown from "../../components/createLearningDropdown";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
import { companyDictionaryList } from "../../companies/localization/index";
import { useContext } from "react";

function Header({ dictionary, direction }) {
	const { userLanguage } = useContext(LanguageChangeContext);
	const { companyDictionary } = companyDictionaryList[userLanguage];
	const labels = companyDictionary.company;


	const items = [
		{
			name: labels.companies,
			to: `/companies`,
			renderButton: [1],
		},
		{
			name: labels.companyDashboard,
			to: `/companies/dashboard`,
			renderButton: [1],
		},
		// {
		// 	name: "Summary",
		// 	to: `/eLearning/summary`,
		// 	renderButton: [1],
		// },
	];

	const buttons = [
		{
			render: <CreateLearningDropdown />,
		},
	];
	return <LayoutHeader backButton={false} items={items} />;
}

export default Header;
