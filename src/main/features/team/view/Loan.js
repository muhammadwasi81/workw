import React from "react";
import { TeamTable } from "./TaskTable/TeamTable";

function Loan() {
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
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Deduction",
      dataIndex: "deduction",
      key: "deduction",
    },
    {
      title: "Deadline",
      dataIndex: "deadline",
      key: "deadline",
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
            referenceNo: "0000",
            status: "pending",
            amount: "9000",
            deduction: 900,
            deadline: "Mon 2019",
            date: "MOn 2019",
          },
        ]}
        // dataSource={tableColumn()}
      />
    </>
  );
}
export default Loan;
