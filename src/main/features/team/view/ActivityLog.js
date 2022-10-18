import React from "react";
import { TeamTable } from "./TaskTable/TeamTable";

function ActivityLog() {
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },

    {
      title: "Login From",
      dataIndex: "loginFrom",
      key: "loginFrom",
    },
    {
      title: "Login IP",
      dataIndex: "loginIP",
      key: "loginIP",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
  ];
  return (
    <>
      <TeamTable
        bordered
        columns={columns}
        // dragable={true}
        // scroll={{ x: true }}
        // size="small"
        className="custom_table"
        dataSource={[
          {
            date: "Mon 2019",
            loginFrom: "web app",
            loginIP: "99999",
            location: "miletap",
          },
        ]}
      />
    </>
  );
}
export default ActivityLog;
