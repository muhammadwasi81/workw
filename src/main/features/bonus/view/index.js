import React from "react";
import { Routes, Route } from "react-router-dom";
import { BrokenPage, STRINGS } from "../../../../utils/base";
import { ROUTES } from "../../../../utils/routes";
import Bonus from "./Bonus";
import IndividualDetail from "./IndividualDetail";

const Index = () => {
  return (
    <Routes>
      <Route exact path={"/"} element={<Bonus />} />
      <Route
        exact
        path={`${ROUTES.BONUS.DETAIL}/:id`}
        element={<IndividualDetail />}
      />

      <Route component={BrokenPage} />
    </Routes>
  );
};

export default Index;
