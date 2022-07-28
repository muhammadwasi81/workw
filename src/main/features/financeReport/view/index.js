import React from "react";
import { Route, Routes } from "react-router-dom";
import { BrokenPage } from "../../../../utils/base";
import Report from "./Report";
import "./style.css";

const Index = () => {
  return (
    <Routes>
      <Route path="/" element={<Report />} />
      <Route element={<BrokenPage />} />
    </Routes>
  );
};

export default Index;
