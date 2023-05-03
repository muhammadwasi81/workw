import React from "react";
import { Collapse, Modal, Skeleton, Table } from "antd";
import { getAllAllowanceGreadeData } from "../../../gradeAllowance/store/action";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AdminTable } from "../../../../sharedComponents/Administration/StyledComponents/adminTable";
const { Panel } = Collapse;

const columns = [
  {
    title: "Name",
    dataIndex: "gradeName",
    key: "gradeName",
  },
  {
    title: "Age",
    dataIndex: "allowanceName",
    key: "allowanceName",
  },
  {
    title: "Address",
    dataIndex: "value",
    key: "value",
  },
  {
    title: "Address",
    dataIndex: "description",
    key: "description",
  },
];

const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
  },
];

const GradeAllowanceTable = () => {
  const dispatch = useDispatch();
  const { AllGradeAllowance } = useSelector(
    (state) => state.employeeSalarySlice
  );
  console.log("AllGradeAllowance", AllGradeAllowance);
  useEffect(() => {
    dispatch(getAllAllowanceGreadeData());
  }, [dispatch]);
  return (
    <div>
      <Collapse>
        <Panel header={"Grade Allowance"}>
          <AdminTable
            columns={columns}
            dataSource={AllGradeAllowance}
            pagination={null}
          />
        </Panel>
      </Collapse>
    </div>
  );
};

export default GradeAllowanceTable;
