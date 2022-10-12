import React from "react";
import { Route, Routes } from "react-router-dom";
import { BrokenPage } from "../../../../utils/base";
import PayrollCreate from "./PayrollCreate";
import PayrollList from "./PayrollList/index";
import "./style.css";

const Index = () => {
  return (
    <Routes>
      <Route path="/" element={<PayrollList />} />
      <Route path="/create" element={<PayrollCreate />} />
      <Route element={<BrokenPage />} />
    </Routes>
  );
};

export default Index;