import React from "react";
import { Route, Routes } from "react-router-dom";
import Jobs from "./Jobs";
import "../view/styles/style.css";

function Index() {
  return (
    <Routes>
      <Route path="/" element={<Jobs />} />
    </Routes>
  );
}

export default Index;
