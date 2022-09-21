import React, { useContext, useState } from "react";
import { LanguageChangeContext } from "../../../utils/localization/localContext/LocalContext";
import {
	ContBody,
	TabbableContainer,
} from "../../sharedComponents/AppComponents/MainFlexContainer";
import WorkBoardDashboard from "./Dashboard/WorkBoardDashboard";
import { WorkBoardDictionary } from "./localization";
import Header from "./UI/Header";
import WorkBoardTopBar from "./UI/WorkBoardTopBar";

function WorkBoard({ referenceType, referenceId }) {
	const { userLanguage } = useContext(LanguageChangeContext);
	const { WorkBoardDictionaryList, Direction } = WorkBoardDictionary[
		userLanguage
	];
	const { topBar } = WorkBoardDictionaryList;
	const [isTableView, setIsTableView] = useState(false);

	return (
		<>
			<TabbableContainer className="">
				<Header />
				<WorkBoardTopBar
					handleView={isTable => {
						setIsTableView(isTable);
					}}
					topBar={topBar}
				/>
				<ContBody className="!block">
					<WorkBoardDashboard
						isTableView={isTableView}
						referenceType={referenceType}
						referenceId={referenceId}
					/>
				</ContBody>
			</TabbableContainer>
		</>
	);
}

export default WorkBoard;
