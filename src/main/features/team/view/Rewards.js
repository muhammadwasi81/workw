import React from "react";
import { TeamTable } from "./TaskTable/TeamTable";

function Rewards() {
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
      title: "Name",
      dataIndex: "name",
      key: "name",
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
            referenceNo: "bbb",
            status: "0",
            category: "bb",
            name: "bbb",
            date: "bbb",
          },
        ]}
      />
    </>
  );
}
export default Rewards;
