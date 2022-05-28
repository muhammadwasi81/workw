import React from "react";
import { Routes, Route } from "react-router-dom";
import EmployeeList from "../view/employeeList";
import EmployeeAdd from "../view";
import { ROUTES } from "../../../../utils/routes";

function EmployeeRoutes() {
  console.log(ROUTES.EMPLOYEES.ADD);
  return (
    <Routes>
      <Route path={ROUTES.EMPLOYEES.ADD} element={<EmployeeAdd />} />
      <Route path="/" element={<EmployeeList />} />
      {/* <Route
				path="*"
				element={
					<>
						<p>not found</p>
					</>
				}
			/> */}
    </Routes>
  );
}

export default EmployeeRoutes;
