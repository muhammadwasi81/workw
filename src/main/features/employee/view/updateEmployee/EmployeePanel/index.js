import EmployeeList from "./employeeList";
import React from "react";
import { EmployeePanelContainer } from "../styles/employee.style";
import EmployeeRoutes from "../EmployeeUpdateRoutes/routes";
import { useParams } from "react-router-dom";
const EmployeesUpdate = () => {
  const { "*": id } = useParams();
  console.log(id, "ID");
  return (
    <>
      <EmployeePanelContainer>
        <EmployeeList id={id} />
        <EmployeeRoutes />
      </EmployeePanelContainer>
    </>
  );
};

export default EmployeesUpdate;
