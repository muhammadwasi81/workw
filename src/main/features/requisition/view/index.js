import React from "react";
import { Routes, Route } from "react-router-dom";
import { BrokenPage, STRINGS } from "../../../../utils/base";
import { ROUTES } from "../../../../utils/routes";
import Requisition from "./requisition";
import IndividualDetail from "./IndividualDetail";

const Index = () => {
  return (
    <Routes>
      <Route exact path={"/"} element={<Requisition />} />
      <Route
        exact
        path={`${ROUTES.REQUISITIONS.DETAIL}/:id`}
        element={<IndividualDetail />}
      />

      <Route component={BrokenPage} />
    </Routes>
  );
};

export default Index;
