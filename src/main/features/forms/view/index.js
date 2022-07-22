import React from "react";
import { Route, Routes } from "react-router-dom";
import { BrokenPage } from "../../../../utils/base";
import Forms from "./forms";

const Index = () => {
  return (
    <Routes>
      <Route path="/" element={<Forms />} />
      <Route element={<BrokenPage />} />
    </Routes>
  );
};

export default Index;
