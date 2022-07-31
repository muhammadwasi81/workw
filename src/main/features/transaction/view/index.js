import React from "react";
import { Route, Routes } from "react-router-dom";
import { BrokenPage } from "../../../../utils/base";
import Transactions from "./Transactions";
import "./style.css";

const Index = () => {
  return (
    <Routes>
      <Route path="/" element={<Transactions />} />
      <Route element={<BrokenPage />} />
    </Routes>
  );
};

export default Index;
