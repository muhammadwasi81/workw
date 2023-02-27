import React, { useState } from "react";
import TopBar from "../../../sharedComponents/topBar/topBar";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

function WorkBoardTopBar({ handleView, topBar, width, handleSearch }) {
	const [filter, setFilter] = useState({
		filterType: 1,
	});
	const [tableView, setTableView] = useState(false);
	handleView(tableView);
	return (
		<>
		<TopBar
			width={width}
			onSearch={handleSearch}
			buttons={
				[
					// {
					// 	name: topBar.publicGroup,
					// 	onClick: () => setFilter({ filterType: 1 }),
					// },
					// {
					// 	name: topBar.privateGroup,
					// 	onClick: () => setFilter({ filterType: 2 }),
					// },
				]
			}
			// filter={{
			// 	onFilter: () => {},
			// }}
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
	</>
	);
}

export default WorkBoardTopBar;
