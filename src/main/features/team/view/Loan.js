import React, { useEffect } from "react";
import { TeamTable } from "./TaskTable/TeamTable";
import { getAllLoanAction } from "../store/action";
import { useDispatch, useSelector } from "react-redux";

function Loan() {
  const dispatch = useDispatch(getAllLoanAction({}));

  useEffect(() => {
    dispatch();
  }, []);
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
      title: "Deduction Per Month",
      dataIndex: "deductionPerMonth",
      key: "deductionPerMonth",
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
            deductionPerMonth: 900,
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
