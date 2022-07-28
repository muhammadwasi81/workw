import React from "react";
import { Routes, Route } from "react-router-dom";
import EmployeeList from "../view/employeeList";
import EmployeeAdd from "../view";
import { ROUTES } from "../../../../utils/routes";
import EmployeesUpdate from "../view/updateEmployee/EmployeePanel";

function EmployeeRoutes() {
  return (
    
      <Routes>
        <Route path={ROUTES.EMPLOYEES.ADD} element={<EmployeeAdd />} />
        <Route path="/" element={<EmployeeList />} />
        <Route path={ROUTES.EMPLOYEES_INFO.DEFAULT} element={<EmployeesUpdate />} />
      </Routes>
  );
}

export default EmployeeRoutes;
