import React, { useState } from "react";
import {
	ContBody,
	TabbableContainer,
} from "../../sharedComponents/AppComponents/MainFlexContainer";
import WorkBoardDashboard from "./Dashboard/WorkBoardDashboard";
import Header from "./UI/Header";
import WorkBoardTopBar from "./UI/WorkBoardTopBar";

function WorkBoard() {
	const [isTableView, setIsTableView] = useState(false);

	return (
		<>
			<TabbableContainer className="">
				<Header />
				<WorkBoardTopBar
					handleView={isTable => {
						setIsTableView(isTable);
					}}
				/>
				<ContBody className="!block">
					<WorkBoardDashboard isTableView={isTableView} />
				</ContBody>
			</TabbableContainer>
		</>
	);
}

export default WorkBoard;
