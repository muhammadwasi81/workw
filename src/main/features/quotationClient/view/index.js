import React from "react";
import { Route, Routes } from "react-router-dom";
import { BrokenPage } from "../../../../utils/base";
import CreateQuotationClient from "./CreateQuotation";
import QuotationClientList from "./QuotationList/index";
import "./style.css";

const Index = () => {
  return (
    <Routes>
      <Route path="/" element={<QuotationClientList />} />
      <Route path="/create" element={<CreateQuotationClient />} />
      <Route element={<BrokenPage />} />
    </Routes>
  );
};

export default Index;
