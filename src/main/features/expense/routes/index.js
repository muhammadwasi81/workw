import React from "react";
import { Route, Routes } from "react-router";
import { BrokenPage, STRINGS } from "../../../../utils/base";
import { ROUTES } from "../../../../utils/routes";
import IndividualDetail from "../view/IndividualDetail";

import Expense from "../index";

function Index() {
  return (
    <Routes>
      <Route path={`/`} exact element={<Expense />} />
      <Route
        exact
        path={`${ROUTES.EXPENSES.DETAIL}/:id`}
        element={<IndividualDetail />}
      />
      <Route path={"*"} element={<BrokenPage />} />
    </Routes>
  );
}

export default Index;
