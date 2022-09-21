import React from "react";
import { Route, Routes } from "react-router-dom";
import Careers from "./Careers";
import "../view/styles/style.css";
import JobDetails from "../view/DetailView/index";

function Index() {
  return (
    <Routes>
      <Route path="jobdetail" element={<JobDetails />} />
      <Route path="/" element={<Careers />} />
    </Routes>
  );
}

export default Index;
