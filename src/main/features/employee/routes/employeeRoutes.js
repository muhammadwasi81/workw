import React from "react";
import { Routes, Route } from "react-router-dom";
import EmployeeList from "../view/employeeList";
import EmployeeAdd from "../view";
import { ROUTES } from "../../../../utils/routes";
import EmployeesUpdate from "../view/updateEmployee/EmployeePanel";
import { BrokenPage } from "../../../../utils/base";

function EmployeeRoutes() {
  return (
    <Routes>
      <Route path={ROUTES.EMPLOYEES.ADD} element={<EmployeeAdd />} />
      <Route path={"/info/*"} element={<EmployeesUpdate />} />
      <Route path="/" element={<EmployeeList />} />
      <Route path="*" element={BrokenPage} />
    </Routes>
  );
}

export default EmployeeRoutes;
