import React from "react";
import { Route, Routes } from "react-router-dom";
import { BrokenPage, STRINGS } from "../../../../utils/base";
import { ROUTES } from "../../../../utils/routes";
import RequisitionDetails from "./myRequisitionDetail";
import Requisition from "./requisition";

const Index = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Requisition />} />
        {/* <Route path="requisitionDetail/:id" element={<RequisitionDetails />} /> */}
        <Route component={<BrokenPage />} />
      </Routes>
    </>
  );
};

export default Index;
