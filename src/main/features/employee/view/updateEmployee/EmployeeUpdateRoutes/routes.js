import React from "react";
import { Route, Routes } from "react-router-dom";
import { BrokenPage } from "../../../../../../utils/base";
import BankForm from "../../../../bankDetails/index";
import BasicInfo from "../../../../basicInfo/index";
import EducationForm from "../../../../education/index";
import EmergencyForm from "../../../../emergencyInfo/index";
import ExperienceForm from "../../../../experienceInfo/index";
import RebateEmployee from "../../../../rebate/rebateEmployee";
import SalaryEmployee from "../../../../salary/view/SalaryEmployee/salaryEmployee";
import UserEmailConfiguration from "../../../../emailUserConfiguration/view/index";
// import UserConfiguration from "../../../../emailConfiguration/view/index";

import UserLeave from "../../../../userLeave";
import Devices from "../../../../devices/view/index";
import "../styles/style.css";

const EmployeeRoutes = () => {
  return (
    <div className="updateFormsBody">
      <Routes>
        <Route path={"/basicInfo/:id"} element={<BasicInfo />} />
        <Route
          path={"/emailConfiguration/:id"}
          element={<UserEmailConfiguration />}
        />
        <Route path={"/leaves/:id"} element={<UserLeave />} />
        <Route path={"/bankDetail/:id"} element={<BankForm mode="edit" />} />
        <Route path={"/education/:id"} element={<EducationForm />} />
        <Route path={"/emergencyInfo/:id"} element={<EmergencyForm />} />
        <Route path={"/rebate/:id"} element={<RebateEmployee mode="edit" />} />
        <Route path={"/salary/:id"} element={<SalaryEmployee mode="edit" />} />
        <Route path={"/experience/:id"} element={<ExperienceForm />} />
        <Route path={"/devices/:id"} element={<Devices />} />
        <Route path={"*"} element={<BrokenPage />} />
      </Routes>
    </div>
  );
};

export default EmployeeRoutes;
