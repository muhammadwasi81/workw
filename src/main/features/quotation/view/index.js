import React from "react";
import { Route, Routes } from "react-router-dom";
import { BrokenPage } from "../../../../utils/base";
import CreateQuotation from "./CreateQuotation";
import QuotationList from "./QuotationList/index";
import "./style.css";

const Index = () => {
  return (
    <Routes>
      <Route path="/" element={<QuotationList />} />
      <Route path="/create" element={<CreateQuotation />} />
      <Route element={<BrokenPage />} />
    </Routes>
  );
};

export default Index;