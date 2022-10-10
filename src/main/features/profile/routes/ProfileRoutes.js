import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { ROUTES } from "../../../../utils/routes";
import About from "../view/About";
import Education from "../view/Education";
import Work from "../view/Work";

function ProfileRoutes() {
	return (
		<div className="flex-1">
			<Routes>
				<Route path={"about"} element={<About />} />
				<Route path={"about_work"} element={<Work />} />
				<Route path={"about_education"} element={<Education />} />
				<Route path={"*"} element={<div>Not found</div>} />
			</Routes>
		</div>
	);
}

export default ProfileRoutes;
