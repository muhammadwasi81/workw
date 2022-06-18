import React from "react";

import { Route, Routes } from "react-router";
import { BrokenPage, STRINGS } from "../../../../utils/base";
import Task from "./Task";
import TaskDetail from "./TaskDetail";
import "../style/task.css";

function Index() {
  return (
    <Routes>
      <Route path={`${STRINGS.ROUTES.TASK.DETAIL}`} element={<TaskDetail />} />
      <Route path={`/`} element={<Task />} />
    </Routes>
  );
}

export default Index;
