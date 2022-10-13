import React from "react";
import { TeamTable } from "./TaskTable/TeamTable";

function CheckIn() {
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
export default CheckIn;
