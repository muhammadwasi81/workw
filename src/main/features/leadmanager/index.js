import React, { useState } from "react";
import {
	ContBody,
	TabbableContainer,
} from "../../sharedComponents/AppComponents/MainFlexContainer";
import Header from "./view/Header/Header";
import Board from "./view/Board/Board";
import LeadTopBar from "./view/LeadTopBar/TopBar";
import LeadDashboard from "./view/Dashboard/Dashboard";

function LeadManager() {
	const [isTableView, setIsTableView] = useState(false);
	return (
		<>
			{/* <Board /> */}
			<Header />
			<TabbableContainer className="">
				<LeadTopBar
					handleView={isTable => {
						setIsTableView(isTable);
					}}
				/>
				<ContBody className="!block">
					<LeadDashboard isTableView={isTableView} />
				</ContBody>
			</TabbableContainer>
		</>
	);
}

export default LeadManager;
