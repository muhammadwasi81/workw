import React from "react";
import { TeamTable } from "./TaskTable/TeamTable";

function Complains() {
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
      title: "Category",
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
        // size="small"
        dataSource={[
          {
            referenceNo: "bbbb",
            status: "approved",
            category: "employee",
            date: "Mon 2019",
          },
        ]}
      />
    </>
  );
}
export default Complains;
