import React from "react";
import TopBar from "../../../../../sharedComponents/topBar/topBar";

export const ScheduleTopBar = ({
	handleView = () => {},
	handleSearch = () => {},
	setFilterType = () => {},
}) => {
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
};
