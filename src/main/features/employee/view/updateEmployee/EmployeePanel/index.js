import EmployeeList from "./employeeList";
import React, { useState } from "react";
import { EmployeePanelContainer } from "../styles/employee.style";
import EmployeeRoutes from "../EmployeeUpdateRoutes/routes";
import BankForm from "../../bankDetailForm";

const EmployeesUpdate = () => {
	
	return (
		<>
			<EmployeePanelContainer>
				<EmployeeList />
				<EmployeeRoutes />
			</EmployeePanelContainer>
		</>
	);
};

export default EmployeesUpdate;
