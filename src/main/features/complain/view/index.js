import React from "react";
import { Route, Routes } from "react-router-dom";
import { BrokenPage  } from "../../../../utils/base";
import { ROUTES } from "../../../../utils/routes"
import Complain from "./Complain";
import IndividualDetail from "./IndividualDetail";

const Index = () => {
  return (
    <Routes>
      <Route
        exact
        path={"/"}
        element={<Complain />}
      />
      <Route
        exact
        path={`${ROUTES.COMPLAINS.DETAIL}/:id`}
        element={<IndividualDetail />}
      />
      <Route element={BrokenPage} />
    </Routes>
  );
};

export default Index;
