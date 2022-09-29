import React, { useContext, useState } from "react";
import { LanguageChangeContext } from "../../../utils/localization/localContext/LocalContext";
import { defaultUiid } from "../../../utils/Shared/enums/enums";
import {
	ContBody,
	TabbableContainer,
} from "../../sharedComponents/AppComponents/MainFlexContainer";
import WorkBoardDashboard from "./Dashboard/WorkBoardDashboard";
import { WorkBoardReferenceTypeEnum } from "./enum";
import { WorkBoardDictionary } from "./localization";
import Header from "./UI/Header";
import WorkBoardTopBar from "./UI/WorkBoardTopBar";

function WorkBoard({
	referenceType = WorkBoardReferenceTypeEnum.General,
	referenceId = defaultUiid,
	width = "",
	routeLink,
	backButton,
}) {
	const { userLanguage } = useContext(LanguageChangeContext);
	const { WorkBoardDictionaryList, Direction } = WorkBoardDictionary[
		userLanguage
	];
	const { topBar } = WorkBoardDictionaryList;
	const [isTableView, setIsTableView] = useState(false);

	return (
		<>
			<TabbableContainer className="">
				<Header
					width={width}
					routeLink={routeLink}
					backButton={backButton}
				/>
				<WorkBoardTopBar
					handleView={isTable => {
						setIsTableView(isTable);
					}}
					topBar={topBar}
					width={width}
				/>
				<ContBody className={`!block ${width}`}>
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
