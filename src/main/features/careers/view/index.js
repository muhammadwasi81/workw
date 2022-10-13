import React from "react";
import { Route, Routes } from "react-router-dom";
import Careers from "./Careers";
import "../view/styles/style.css";
import JobDetails from "./DetailView/index";

function Index() {
  return (
    <Routes>
      <Route path="/" element={<Careers />} />
      <Route path="jobdetail/:id" element={<JobDetails />} />
    </Routes>
  );
}

export default Index;
