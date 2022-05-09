import React from "react";
import { Routes, Route } from "react-router-dom";
import { BrokenPage, STRINGS } from "../../../utils/base";
import Bonus from "./Bonus";
import "./bonus.css";

const Index = () => {
	return (
		<Routes>
			<Route
				to={`${STRINGS.ROUTES.HR.BONUS.DEFAULT}`}
				element={<Bonus />}
			/>
			<Route element={<BrokenPage />} />
		</Routes>
	);
};

export default Index;
