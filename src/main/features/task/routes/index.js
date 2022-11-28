import React from "react";

import { Route, Routes } from "react-router";
import { BrokenPage, STRINGS } from "../../../../utils/base";
import { ROUTES } from "../../../../utils/routes";

import Task from "../view/Task";
// import TaskDetail from "../view/TaskDetail/detailView";
import IndividualDetail from "../view/TaskDetail/IndividualDetail";
// import "../view/style/task.css";

function Index() {
  return (
    <Routes>
      <Route path={`/`} exact element={<Task />} />
      <Route
        path={`${ROUTES.TASK.DETAIL}/:id`}
        exact
        element={<IndividualDetail />}
      />
    </Routes>
  );
}

export default Index;
