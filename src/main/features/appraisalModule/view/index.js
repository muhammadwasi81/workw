import React from "react";
import { Route, Routes } from "react-router-dom";
import { BrokenPage } from "../../../../utils/base";
import { ROUTES } from "../../../../utils/routes";

import Appraisals from "./appraisal";
import SubmitAppraisal from "./components/SubmitAppraisal/index";
// import "./style.css";
import IndividualDetail from "./components/IndividualCard";

const Index = () => {
  return (
    <Routes>
      <Route path="/" element={<Appraisals />} />
      <Route path="submitAppraisal" element={<SubmitAppraisal />} />
      <Route
        exact
        path={`${ROUTES.APPRAISALS.DETAIL}/:id`}
        element={<IndividualDetail />}
      />

      <Route element={<BrokenPage />} />
    </Routes>
  );
};

export default Index;
