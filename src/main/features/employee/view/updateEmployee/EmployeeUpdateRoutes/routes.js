import React from "react";
import { Route, Routes } from "react-router-dom";
import { ROUTES } from "../../../../../../utils/routes";
import BankForm from "../../../../bankDetails/index";
import BasicInfo from "../../../../basicInfo/index";
import EducationForm from "../../../../education/index";
import EmergencyForm from "../../../../emergencyInfo/index";
import ExperienceForm from "../../experienceForm";
import "../styles/style.css"

const EmployeeRoutes = () => {
  return (
    <div className="updateFormsBody">
      <Routes>
        <Route path={ROUTES.EMPLOYEES_INFO.BASIC_INFO} element={<BasicInfo />} />
        <Route path={ROUTES.EMPLOYEES_INFO.BANK_DETAIL} element={<BankForm />} />
        <Route path={ROUTES.EMPLOYEES_INFO.EDUCATION} element={<EducationForm />} />
        <Route path={ROUTES.EMPLOYEES_INFO.EMERGENCY_INFO} element={<EmergencyForm />} />
        <Route path={ROUTES.EMPLOYEES_INFO.EXPERIENCE} element={<ExperienceForm />} />
      </Routes>
    </div>
  );
};

export default EmployeeRoutes;
