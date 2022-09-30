import React from "react";

import { Route, Routes } from "react-router";
import { BrokenPage, STRINGS } from "../../../../utils/base";
import Task from "../view/Task";
import TaskDetail from "../view/TaskDetail/detailView";
// import "../view/style/task.css";

function Index() {
	return (
		<Routes>
			<Route path={`/`} element={<Task />} />
			<Route
				path={`${STRINGS.ROUTES.TASK.DETAIL}`}
				element={<TaskDetail />}
			/>
		</Routes>
	);
}

export default Index;
