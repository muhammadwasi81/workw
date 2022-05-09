import React from "react";

import { Route, Routes } from "react-router-dom";
import { BrokenPage, STRINGS } from "../../../utils/base";
import Complains from "./Complains";

export default function index() {
	return (
		<Routes>
			<Route
				path={`${STRINGS.ROUTES.HR.COMPLAINS.DEFAULT}`}
				element={<Complains />}
			/>
			<Route element={<BrokenPage />} />
		</Routes>
	);
}
