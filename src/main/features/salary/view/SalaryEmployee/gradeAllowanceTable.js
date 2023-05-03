import React from "react";
import { Collapse, Modal, Skeleton, Table } from "antd";
import { AdminTable } from "../../../../sharedComponents/Administration/StyledComponents/adminTable";
const { Panel } = Collapse;

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
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

const gradeAllowanceTable = () => {
  return (
    <div>
      <Collapse>
        <Panel header={"Grade Allowance"}>
          <AdminTable columns={columns} dataSource={data} pagination={null} />
        </Panel>
      </Collapse>
    </div>
  );
};

export default gradeAllowanceTable;
