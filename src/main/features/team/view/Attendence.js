import React, { useState, useEffect } from "react";
import { Table } from "../../../sharedComponents/customTable";
import { TeamTable } from "./TaskTable/TeamTable";

function Attendence() {
  const columns = [
    {
      title: "Position",
      dataIndex: "position",
      key: "position",
    },

    {
      title: "EmploymentType",
      dataIndex: "employmentTypeId",
      key: "employmentTypeId",
    },
    {
      title: "City",
      dataIndex: "cityId",
      key: "cityId",
    },
  ];
  return (
    <>
      <TeamTable
        bordered
        columns={columns}
        // dragable={true}
        scroll={{ x: 500 }}
        size="small"
        dataSource={[
          {
            position: "one",
            employmentTypeId: "test Employee",
            cityId: "test City",
          },
        ]}
        // dataSource={tableColumn()}
      />
    </>
  );
}
export default Attendence;
