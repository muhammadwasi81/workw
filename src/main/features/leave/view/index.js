import React from "react";
import { Routes, Route } from "react-router-dom";
import { BrokenPage, STRINGS } from "../../../../utils/base";
import { ROUTES } from "../../../../utils/routes";
import IndividualDetail from "./IndividualDetail";

import Leave from "./Leave";
const Index = () => {
  return (
    <Routes>
      <Route exact path={"/"} element={<Leave />} />
      <Route
        exact
        path={`${ROUTES.LEAVES.DETAIL}/:id`}
        element={<IndividualDetail />}
      />
      <Route component={BrokenPage} />
    </Routes>
  );
};

export default Index;
