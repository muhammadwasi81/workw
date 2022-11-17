import React from "react";
import { Switch, Route, Routes } from "react-router-dom";
import { BrokenPage, STRINGS } from "../../../../utils/base";
import Department from "./Department";
import DepartmentDetails from "../DepartmentDetails/DeptartmentDetails";

const Index = () => {
  return (
    <Routes>
      <Route path="/" element={<Department />} />
      <Route path="department-detail/:id" element={<DepartmentDetails />} />
      <Route element={<BrokenPage />} />
    </Routes>
  );
};

export default Index;
