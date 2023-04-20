import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getEmployeeSalaryAction } from "../../salary/view/SalaryEmployee/action/action";
import { SalaryDataTable } from "./salaryTable";
import { Table } from "antd";

const SalaryTable = () => {
  const dispatch = useDispatch();
  const param = useParams();
  const { id } = param;

  const { currentEmployeeSalary } = useSelector(
    (state) => state.employeeSalarySlice
  );

  console.log(currentEmployeeSalary, "currentEmployeeSalary");

  useEffect(() => {
    dispatch(getEmployeeSalaryAction(id));
  }, []);

  return (
    <Table
      bordered
      columns={SalaryDataTable}
      className="custom_table"
      dataSource={currentEmployeeSalary ? currentEmployeeSalary : []}
    />
    // <div className="createEntryTable">
    //   <table className="!min-w-full">
    //     <thead>
    //       <tr>
    //         <th className="!py-1 !px-2 text-left">Name</th>
    //         <th className="!py-1 !px-2 text-left">Address</th>
    //         <th className="!py-1 !px-2 text-left">Social insurance No</th>
    //         <th className="!py-1 !px-2 text-left">Evaluation Date</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       <tr>
    //         <td className="!py-1 !px-2 text-left">Alex Hales</td>
    //         <td className="!py-1 !px-2 text-left">
    //           123, Main Street, New York, USA
    //         </td>
    //         <td className="!py-1 !px-2 text-left">123-456-789</td>
    //         <td className="!py-1 !px-2 text-left">2020-02-02 12:00:00</td>
    //       </tr>
    //     </tbody>
    //   </table>
    // </div>
  );
};

export default SalaryTable;
