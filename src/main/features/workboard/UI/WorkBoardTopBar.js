import React, { useState } from "react";
import TopBar from "../../../sharedComponents/topBar/topBar";

function WorkBoardTopBar() {
	const [filter, setFilter] = useState({
		filterType: 1,
	});
	const [tableView, setTableView] = useState(false);
	return (
		<TopBar
			onSearch={value => {
				console.log(value);
			}}
			buttons={[
				{
					name: "Public Groups",
					onClick: () => setFilter({ filterType: 1 }),
				},
				{
					name: "Private Groups",
					onClick: () => setFilter({ filterType: 2 }),
				},
			]}
			filter={{
				onFilter: () => {},
			}}
			segment={{
				onSegment: value => {
					if (value === "Table") {
						setTableView(true);
					} else {
						setTableView(false);
					}
				},
				label1: "List",
				label2: "Table",
			}}
		/>
	);
}

export default WorkBoardTopBar;
