import React, { useState, useEffect } from "react";
import { TeamTable } from "./TaskTable/TeamTable";
import { Button } from "antd";

function Attendence() {
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },

    {
      title: "Check In",
      dataIndex: "checkIn",
      key: "checkIn",
    },
    {
      title: "Check Out",
      dataIndex: "checkOut",
      key: "checkOut",
    },
    {
      title: "Late",
      dataIndex: "late",
      key: "late",
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
    },
    {
      title: "State",
      dataIndex: "state",
      key: "state",
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
        className="custom_table"
        columns={columns}
        // dragable={true}
        // scroll={{ x: 500 }}
        // scroll={{ x: true }}
        dataSource={[
          {
            date: "Mon May 2020",
            checkIn: "12:00AM",
            checkOut: "12:00 AM",
            late: "0",
            duration: "0",
            state: "0",
            action: [
              <Button
                // icon={<EditOutlined />}
                className="ThemeBtn"
              >
                Update
              </Button>,
            ],
          },
        ]}
        // dataSource={tableColumn()}
      />
    </>
  );
}
export default Attendence;
