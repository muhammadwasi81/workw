import React from "react";
import { Route, Routes } from "react-router-dom";
import { BrokenPage } from "../../../../utils/base";
import GeneralEntry from "./GeneralEntry";
import "./style.css";

const Index = () => {
  return (
    <Routes>
      <Route path="/" element={<GeneralEntry />} />
      <Route element={<BrokenPage />} />
    </Routes>
  );
};

export default Index;