import React from "react";
import { Route, Routes } from "react-router-dom";
import { BrokenPage } from "../../../../utils/base";
import CreateSalary from "./SalaryCreate";
import SalaryList from "./SalaryList/index";
import "./style.css";

const Index = () => {
  return (
    <Routes>
      <Route path="/" element={<SalaryList />} />
      <Route path="/create" element={<CreateSalary />} />
      <Route element={<BrokenPage />} />
    </Routes>
  );
};

export default Index;