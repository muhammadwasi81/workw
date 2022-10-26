import React from "react";
import { Route, Routes } from "react-router-dom";
import {
	ContBody,
	TabbableContainer,
} from "../../sharedComponents/AppComponents/MainFlexContainer";
import MainDashboard from "./view/Dashboard/MainDashboard";
import Summary from "./view/Dashboard/Summary";
import TeamDahsboard from "./view/Dashboard/TeamDahsboard";
import Header from "./view/Header/Header";

function ELearning() {
	return (
		<>
			<TabbableContainer>
				<Header />
				<ContBody className="!block">
					<Routes>
						<Route path="/" element={<MainDashboard />} />
						<Route
							path="teamDashboard"
							element={<TeamDahsboard />}
						/>
						<Route path="summary" element={<Summary />} />
					</Routes>
				</ContBody>
			</TabbableContainer>
		</>
	);
}

export default ELearning;
