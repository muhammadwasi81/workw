import React, { useContext, useState } from "react";
import {
	ContBody,
	TabbableContainer,
} from "../../sharedComponents/AppComponents/MainFlexContainer";
import Header from "./view/Header/Header";
import Board from "./view/Board/Board";
import LeadTopBar from "./view/LeadTopBar/TopBar";
import LeadDashboard from "./view/Dashboard/Dashboard";
import { LeadManagerDictionary } from "./localization";
import { LanguageChangeContext } from "../../../utils/localization/localContext/LocalContext";

function LeadManager() {
	const { userLanguage } = useContext(LanguageChangeContext);
	const { LeadManagerDictionaryList, Direction } = LeadManagerDictionary[
		userLanguage
	];
	const {
		createTextBtn,
		dashboard,
		topBar,
		placeHolder,
		labels,
		table,
	} = LeadManagerDictionaryList;
	const [isTableView, setIsTableView] = useState(false);
	return (
		<TabbableContainer>
			<Header
				dictionary={LeadManagerDictionaryList}
				direction={Direction}
			/>
			<LeadTopBar
				handleView={isTable => {
					setIsTableView(isTable);
				}}
				topBar={topBar}
			/>
			<ContBody className="!block" direction={Direction}>
				<LeadDashboard
					isTableView={isTableView}
					dictionary={LeadManagerDictionaryList}
				/>
			</ContBody>
		</TabbableContainer>
	);
}

export default LeadManager;
