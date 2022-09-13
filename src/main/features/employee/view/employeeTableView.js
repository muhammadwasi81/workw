import React from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { Table } from "../../../sharedComponents/customTable";

import { tableColumn } from "./tableColumns";

function EmployeeTableView() {
  const { employees } = useSelector((state) => state.employeeSlice);
  return (
    <Table
      columns={tableColumn()}
      dragable={true}
      data={employees ? employees : []}
    />
  );
}

export default EmployeeTableView;
