import React, { useState } from "react";
import TopBar from "../../../../../sharedComponents/topBar/topBar";

function ScheduleTopBar({
	handleView = () => {},
	topBar,
	handleSearch = () => {},
	setFilterType = () => {},
}) {
	// const [tableView, setTableView] = useState(false);
	// handleView(tableView);
	return (
		<TopBar
			onSearch={value => {
				handleSearch(value);
			}}
			buttons={[
				{
					name: "My Schedules",
					onClick: () => setFilterType(1),
				},
				{
					name: "Team Schedules",
					onClick: () => setFilterType(2),
				},
			]}
			// filter={{
			// 	onFilter: () => {},
			// }}
			segment={{
				onSegment: value => {
					if (value === "Table") {
						handleView(true);
					} else {
						handleView(false);
					}
				},
				label1: "List",
				label2: "Table",
			}}
		/>
	);
}

export default ScheduleTopBar;
