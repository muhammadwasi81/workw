import React from "react";
import { Routes, Route } from "react-router-dom";
import EmployeeList from "../view/employeeList";
import EmployeeAdd from "../view";
import { ROUTES } from "../../../../utils/routes";

function EmployeeRoutes() {
  return (
    <Routes>
      <Route path={ROUTES.EMPLOYEES.ADD} element={<EmployeeAdd />} />
      <Route path="/" element={<EmployeeList />} />
    </Routes>
  );
}

export default EmployeeRoutes;
