import React, { useState } from "react";
import TopBar from "../../../sharedComponents/topBar/topBar";

function WorkBoardTopBar({ handleView, topBar, width }) {
	const [filter, setFilter] = useState({
		filterType: 1,
	});
	const [tableView, setTableView] = useState(false);
	handleView(tableView);
	return (
		<TopBar
			width={width}
			onSearch={value => {
				console.log(value);
			}}
			buttons={[
				{
					name: topBar.publicGroup,
					onClick: () => setFilter({ filterType: 1 }),
				},
				{
					name: topBar.privateGroup,
					onClick: () => setFilter({ filterType: 2 }),
				},
			]}
			filter={{
				onFilter: () => {},
			}}
			segment={{
				onSegment: value => {
					if (value === topBar.table) {
						setTableView(true);
					} else {
						setTableView(false);
					}
				},
				label1: topBar.list,
				label2: topBar.table,
			}}
		/>
	);
}

export default WorkBoardTopBar;
