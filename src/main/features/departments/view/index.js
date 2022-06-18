import React from "react";
import { Switch, Route, Routes } from "react-router-dom";
import { BrokenPage, STRINGS } from "../../../../utils/base";
import Department from "./Department";

const Index = () => {
  return (
    <Routes>
      <Route path="/" element={<Department />} />
      <Route element={<BrokenPage />} />
    </Routes>
  );
};

export default Index;
