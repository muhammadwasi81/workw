import React from "react";
import { Route, Routes } from "react-router-dom";
import { BrokenPage } from "../../../../utils/base";
import Documents from "./documents";

const Index = () => {
  return (
    <Routes>
      <Route path="/" element={<Documents />} />
      <Route element={<BrokenPage />} />
    </Routes>
  );
};

export default Index;
