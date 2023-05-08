import React from "react";
import { Collapse, Modal, Skeleton, Table } from "antd";
import { getAllAllowanceGreadeData } from "../../../gradeAllowance/store/action";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AdminTable } from "../../../../sharedComponents/Administration/StyledComponents/adminTable";
const { Panel } = Collapse;

const columns = [
  {
    title: "Grade Name",
    dataIndex: "gradeName",
    key: "gradeName",
  },
  {
    title: "Allowance Name",
    dataIndex: "allowanceName",
    key: "allowanceName",
  },
  {
    title: "Value",
    dataIndex: "value",
    key: "value",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
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
