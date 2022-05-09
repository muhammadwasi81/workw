import AdminList from "./adminlist";
import React from "react";
import { AdminPanelContainer } from "../styles/admin.style";
import AdminRoutes from "../AdminRoutes/adminroutes";
import { AdminNotification } from "./notification";

const Administration = () => {
	return (
		<AdminPanelContainer>
			<AdminList />
			<AdminRoutes />
			<AdminNotification />
		</AdminPanelContainer>
	);
};

export default Administration;
