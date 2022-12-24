import React from "react";
import { Routes, Route } from "react-router-dom";
import { BrokenPage, STRINGS } from "../../../../utils/base";
import { ROUTES } from "../../../../utils/routes";
import Promotion from "./Promotions";
import IndividualDetail from "./IndividualDetail";

const Index = () => {
  return (
    <Routes>
      <Route exact path={"/"} element={<Promotion />} />
      <Route
        exact
        path={`${ROUTES.PROMOTION.DETAIL}/:id`}
        element={<IndividualDetail />}
      />

      <Route component={BrokenPage} />
    </Routes>
  );
};

export default Index;
