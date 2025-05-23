import AdminList from "./adminlist";
import React from "react";
import { AdminPanelContainer } from "../styles/admin.style";
import AdminRoutes from "../AdminRoutes/adminroutes";
import { AdminNotification } from "./notification";
// import { Route, Routes } from "react-router-dom";
// import { routes } from "../../../../routes/routes";
// import { Outlet } from "react-router-dom";

const Administration = () => {
	return (
		<>
			<AdminPanelContainer>
				<AdminList />
				<AdminRoutes />
				{/* <Outlet /> */}
				<AdminNotification />
			</AdminPanelContainer>
		</>
	);
};

export default Administration;
