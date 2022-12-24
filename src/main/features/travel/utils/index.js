import React from "react";
import { Routes, Route } from "react-router-dom";
import { BrokenPage, STRINGS } from "../../../../utils/base";
import { ROUTES } from "../../../../utils/routes";
import Travel from "./view/Travel";
// import IndividualDetail from "./IndividualDetail";

const Index = () => {
  return (
    <Routes>
      <Route exact path={"/"} element={<Travel />} />
      <Route
        exact
        path={`${ROUTES.TRAVEL.DETAILS}/:id`}
        // element={<IndividualDetail />}
      />

      <Route component={BrokenPage} />
    </Routes>
  );
};

export default Index;
