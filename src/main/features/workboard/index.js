import React from "react";
import {
	ContBody,
	TabbableContainer,
} from "../../sharedComponents/AppComponents/MainFlexContainer";
import WorkBoardDashboard from "./Dashboard/WorkBoardDashboard";

import Header from "./UI/Header";
import WorkBoardTopBar from "./UI/WorkBoardTopBar";

function WorkBoard() {
	const onWorkBoardClick = id => {
		console.log("id", id);
	};
	return (
		<>
			{/* <Board /> */}
			<Header />
			<TabbableContainer className="">
				<WorkBoardTopBar />
				<ContBody className="!block">
					<WorkBoardDashboard onWorkBoardClick={onWorkBoardClick} />
				</ContBody>
			</TabbableContainer>
		</>
	);
}

export default WorkBoard;
