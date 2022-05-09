import React from "react";

import { Route, Routes } from "react-router";
import { BrokenPage, STRINGS } from "../../../../utils/base";
import Task from "./Task";
import TaskDetail from "./TaskDetail";

function Index() {
	return (
		<Routes>
			<Route path={`${STRINGS.ROUTES.TASK.DEFAULT}`} element={<Task />} />
			<Route
				path={`${STRINGS.ROUTES.TASK.DETAIL}/:id`}
				element={<TaskDetail />}
			/>
			{/*<Route path={`${STRINGS.ROUTES.GROUP.SCHEDULES}/:id`} element={GroupDescription}/>*/}
			{/*<Route  path={`${STRINGS.ROUTES.GROUP.TASKS}/:id`} element={GroupDescription}/>*/}
			{/*<Route  path={`${STRINGS.ROUTES.GROUP.EXPENSES}/:id/:sId?`} element={GroupDescription}/>*/}
			<Route element={<BrokenPage />} />
		</Routes>
	);
}

export default Index;
