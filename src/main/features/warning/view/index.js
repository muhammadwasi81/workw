import React from "react";
import { Routes, Route } from "react-router-dom";
import { BrokenPage, STRINGS } from "../../../../utils/base";
import { ROUTES } from "../../../../utils/routes";
import IndividualDetail from "./IndividualDetail";

import Warning from "./Warning";
const Index = () => {
  return (
    <Routes>
      <Route exact path={"/"} element={<Warning />} />
      <Route
        exact
        path={`${ROUTES.WARNINGS.DETAIL}/:id`}
        element={<IndividualDetail />}
      />
      <Route component={BrokenPage} />
    </Routes>
  );
};

export default Index;
