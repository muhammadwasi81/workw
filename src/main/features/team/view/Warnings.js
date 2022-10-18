import React from "react";
import { TeamTable } from "./TaskTable/TeamTable";
import "../Styles/table.css";
function Warnings() {
  const columns = [
    {
      title: "Reference No.",
      dataIndex: "referenceNo",
      key: "referenceNo",
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Ctaegory",
      dataIndex: "category",
      key: "category",
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
            referenceNo: "ooooo",
            status: "pending",
            category: "employee",
            date: "Mon 2019",
          },
        ]}
        // dataSource={tableColumn()}
      />
    </>
  );
}
export default Warnings;
