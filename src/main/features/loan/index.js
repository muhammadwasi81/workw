import React from "react";
import { Routes, Route } from "react-router-dom";
import { BrokenPage, STRINGS } from "../../../utils/base";
import { ROUTES } from "../../../utils/routes";
import IndividualDetail from "./IndividualDetail";

import Loan from "./Loan";
const Index = () => {
  return (
    <Routes>
      <Route exact path={"/"} element={<Loan />} />
      <Route
        exact
        path={`${ROUTES.LOAN.DETAIL}/:id`}
        element={<IndividualDetail />}
      />
      <Route component={BrokenPage} />
    </Routes>
  );
};

export default Index;
