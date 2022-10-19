import React from "react";
import { TeamTable } from "./TaskTable/TeamTable";

function Leaves() {
  const columns = [
    {
      title: "Leave Type",
      dataIndex: "leaveType",
      key: "leaveType",
    },

    {
      title: "Alloted",
      dataIndex: "alloted",
      key: "alloted",
    },
    {
      title: "Availed",
      dataIndex: "availed",
      key: "availed",
    },
    {
      title: "Remaining",
      dataIndex: "remaining",
      key: "remaining",
    },
  ];
  return (
    <>
      <TeamTable
        bordered
        columns={columns}
        // dragable={true}
        // scroll={{ x: true }}
        className="custom_table"
        dataSource={[
          {
            leaveType: "0",
            alloted: "0",
            availed: "0",
            remaining: "0",
          },
        ]}
      />
    </>
  );
}
export default Leaves;
