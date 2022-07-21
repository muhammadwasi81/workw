import React from "react";
import {
	ContBody,
	TabbableContainer,
} from "../../sharedComponents/AppComponents/MainFlexContainer";
import WorkBoardDashboard from "./Dashboard/WorkBoardDashboard";
import Header from "./UI/Header";
import WorkBoardTopBar from "./UI/WorkBoardTopBar";

function WorkBoard() {
	return (
		<>
			<Header />
			<TabbableContainer className="">
				<WorkBoardTopBar />
				<ContBody className="!block">
					<WorkBoardDashboard />
				</ContBody>
			</TabbableContainer>
		</>
	);
}

export default WorkBoard;
