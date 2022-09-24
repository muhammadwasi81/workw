import React from "react";
import { Route, Routes } from "react-router-dom";
import Careers from "./Careers";
import "../view/styles/style.css";

function Index() {
  return (
    <Routes>
      <Route path="/" element={<Careers />} />
    </Routes>
  );
}

export default Index;
