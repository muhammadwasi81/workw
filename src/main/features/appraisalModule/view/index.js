import React from "react";
import { Route, Routes } from "react-router-dom";
import { BrokenPage } from "../../../../utils/base";
import Appraisals from "./appraisal";

// import "./style.css";

const Index = () => {
  return (
    <Routes>
      <Route path="/" element={<Appraisals />} />
      {/* <Route path="/create" element={<CreateQuotation />} /> */}
      <Route element={<BrokenPage />} />
    </Routes>
  );
};

export default Index;
