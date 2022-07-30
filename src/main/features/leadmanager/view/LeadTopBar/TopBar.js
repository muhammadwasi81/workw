import React, { useState } from "react";
import TopBar from "../../../../sharedComponents/topBar/topBar";

function LeadTopBar({ handleView, topBar }) {
	// const [filter, setFilter] = useState({
	// 	filterType: 1,
	// });
	const [tableView, setTableView] = useState(false);
	handleView(tableView);
	return (
		<TopBar
			onSearch={value => {
				console.log(value);
			}}
			buttons={[]}
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

export default LeadTopBar;
