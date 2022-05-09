import React from "react";
import { Routes, Route } from "react-router-dom";
import { BrokenPage, STRINGS } from "../../../utils/base";
import Warnings from "./Warnings";

const Index = () => {
	return (
		<Routes>
			<Route
				path={`${STRINGS.ROUTES.HR.WARNINGS.DEFAULT}`}
				element={<Warnings />}
			/>
			{/* <Route path={`${STRINGS.ROUTES.HR.WARNINGS.APPROVALS}`} element={WarningFilterForm}/> */}
			<Route element={<BrokenPage />} />
		</Routes>
	);
};

export default Index;
