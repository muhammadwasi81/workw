import React from "react";
import { Routes, Route } from "react-router-dom";
import { BrokenPage, STRINGS } from "../../../../utils/base";
import { ROUTES } from "../../../../utils/routes";
import CustomApproval from "./CustomApproval";
import IndividualDetail from "./IndividualDetail";

const Index = () => {
  return (
    <Routes>
      <Route exact path={"/"} element={<CustomApproval />} />
      <Route
        exact
        path={`${ROUTES.CUSTOM_APPROVALS.DETAIL}/:id`}
        element={<IndividualDetail />}
      />

      <Route component={BrokenPage} />
    </Routes>
  );
};

export default Index;
