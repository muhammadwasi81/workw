import React from "react";
import { TeamTable } from "./TaskTable/TeamTable";

function CheckIn() {
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },

    {
      title: "Time",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Comments",
      dataIndex: "comments",
      key: "comments",
    },
    {
      title: "Mood",
      dataIndex: "mood",
      key: "mood",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
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
            date: "0",
            time: "0",
            status: "0",
            comments: "kk",
            mood: "satisfied",
            location: "jjj",
            action: "button",
          },
        ]}
        // dataSource={tableColumn()}
      />
    </>
  );
}
export default CheckIn;
