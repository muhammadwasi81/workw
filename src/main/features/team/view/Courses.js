import React from "react";
import { TeamTable } from "./TaskTable/TeamTable";

function Courses() {
  const columns = [
    {
      title: "Course Name",
      dataIndex: "courseName",
      key: "courseName",
    },

    {
      title: "Date",
      dataIndex: "date",
      key: "date",
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
            courseName: "Web Engineering",
            date: "Mon 2019",
          },
        ]}
        // dataSource={tableColumn()}
      />
    </>
  );
}
export default Courses;
