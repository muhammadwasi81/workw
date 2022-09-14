import React from "react";
import { Route, Routes } from "react-router-dom";
import { BrokenPage } from "../../../../../../utils/base";
import BankForm from "../../../../bankDetails/index";
import BasicInfo from "../../../../basicInfo/index";
import EducationForm from "../../../../education/index";
import EmergencyForm from "../../../../emergencyInfo/index";
import ExperienceForm from "../../../../experienceInfo/index";
import "../styles/style.css";

const EmployeeRoutes = () => {
  return (
    <div className="updateFormsBody">
      <Routes>
        <Route path={"/basicInfo/:id"} element={<BasicInfo />} />
        <Route path={"/bankDetail/:id"} element={<BankForm mode="edit" />} />
        <Route path={"/education/:id"} element={<EducationForm />} />
        <Route path={"/emergencyInfo/:id"} element={<EmergencyForm />} />
        <Route path={"/rebate/:id"} element={<EducationForm />} />
        <Route path={"/salary/:id"} element={<EmergencyForm />} />
        <Route path={"/experience/:id"} element={<ExperienceForm />} />
        <Route path={"*"} element={<BrokenPage />} />
      </Routes>
    </div>
  );
};

export default EmployeeRoutes;
