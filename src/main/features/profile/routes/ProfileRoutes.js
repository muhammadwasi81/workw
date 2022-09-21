import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { ROUTES } from "../../../../utils/routes";

function ProfileRoutes() {
	return (
		<Routes>
			<Route
				path={"about"}
				element={<div className="basis-[100% - 300px]">Abc</div>}
			/>
			<Route path={"*"} element={<div>Not found</div>} />
		</Routes>
	);
}

export default ProfileRoutes;
