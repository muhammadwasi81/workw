import React, { useEffect, useState } from "react";

import { Route, Routes } from "react-router";
import { useSearchParams } from "react-router-dom";
import { BrokenPage, STRINGS } from "../../../../utils/base";
import Schedules from "../index";
function Index() {
	return (
		<Routes>
			<Route path={`/`} element={<Schedules />} />
			<Route path={"*"} element={<BrokenPage />} />
		</Routes>
	);
}

export default Index;
