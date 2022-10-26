import React from "react";
import Nodata from "../../../../../content/NewContent/eLearning/no_data.svg";
import DashboardLayout from "./Layout/DashboardLayout";

function TeamDahsboard() {
	return (
		<DashboardLayout>
			<div className="flex items-center justify-center h-full">
				<img src={Nodata} />
			</div>
		</DashboardLayout>
	);
}

export default TeamDahsboard;
