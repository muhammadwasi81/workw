import React from "react";
import { Routes, Route } from "react-router-dom";
import { BrokenPage, STRINGS } from "../../../utils/base";
import Resignation from "./Resignation";

const index = () => {
	return (
		<>
			<Routes>
				<Route
					path={`${STRINGS.ROUTES.HR.RESIGNATIONS.DEFAULT}`}
					element={<Resignation />}
				/>
				<Route element={<BrokenPage />} />
			</Routes>
		</>
	);
};

export default index;
