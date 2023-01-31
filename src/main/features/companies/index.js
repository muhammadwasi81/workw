import React from "react";
import { Route, Routes } from "react-router-dom";
import {
	ContBody,
} from "../../sharedComponents/AppComponents/MainFlexContainer";
import CompanyList from "./companies/view/CompanyList";
import CompanyUpdate from "./companies/view/UpdateTeam/TeamPannel";
import MainDashboard from "./view/Dashboard/MainDashboard";
import Signup from "./view/Signup/signup";

function Companies() {
	return (
		<>
			<ContBody className="!block">
				<Routes>
					<Route path="/" element={<CompanyList />} />
					<Route path="/dashboard" element={<MainDashboard />} />
					<Route path="/info/*" element={<CompanyUpdate />} />
					<Route path="/signup" element={<Signup/>} />

				</Routes>
			</ContBody>
		</>
	);
}

export default Companies;
