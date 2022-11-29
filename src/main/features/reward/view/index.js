import React from "react";
import { Routes, Route } from "react-router-dom";
import { BrokenPage, STRINGS } from "../../../../utils/base";
import { ROUTES } from "../../../../utils/routes";
import IndividualDetail from "./IndividualDetail";

import Reward from "./Reward";

const Index = () => {
  return (
    <Routes>
      <Route exact path={"/"} element={<Reward />} />
      <Route
        exact
        path={`${ROUTES.REWARDS.DETAIL}/:id`}
        element={<IndividualDetail />}
      />
      <Route component={BrokenPage} />
    </Routes>
  );
};

export default Index;
