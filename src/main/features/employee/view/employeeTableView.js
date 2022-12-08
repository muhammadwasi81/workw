import React,{useContext} from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { Table } from "../../../sharedComponents/customTable";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { employeeDictionaryList } from "../localization";

import { tableColumn } from "./tableColumns";

function EmployeeTableView() {

  const { userLanguage } = useContext(LanguageChangeContext);
	const { employeesDictionary} = employeeDictionaryList[userLanguage];
	const { tables } = employeesDictionary;

  const { employees } = useSelector((state) => state.employeeSlice);
  return (
    <Table
      columns={tableColumn(tables)}
      //columns={tableColumn()}
      dragable={true}
      data={employees ? employees : []}
    />
  );
}

export default EmployeeTableView;
