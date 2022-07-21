import React from "react";
import { Route, Routes } from "react-router-dom";
import { BrokenPage } from "../../../../utils/base";
import ChartOfAccounts from "./ChartOfAccounts"
// import "./style.css";

const Index = () => {
  return (
    <Routes>
      <Route path="/" element={<ChartOfAccounts />} />
      <Route element={<BrokenPage />} />
    </Routes>
  );
};

export default Index;