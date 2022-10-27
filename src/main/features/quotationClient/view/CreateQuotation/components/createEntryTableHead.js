import React, { useEffect, useState } from "react";

const CreateEntryHead = () => {
  return (
    <thead>
      <tr className="whitespace-nowrap">
        <th style={{ minWidth: "6%" }}>S.No.</th>
        <th style={{ minWidth: "40%" }}>Service/Item</th>
        <th style={{ minWidth: "10%" }}>Price</th>
        <th style={{ minWidth: "6%" }}>Quantity</th>
        <th style={{ minWidth: "16%" }}>Tax</th>
        <th style={{ minWidth: "16%" }}>Total Amount</th>
        {/* <th style={{ minWidth: "150px" }}>
          Deductions
        </th>
        <th style={{ minWidth: "150px" }}>
          Net Salary
        </th>
        <th style={{ minWidth: "300px" }}>
          Approvers
        </th>
        <th style={{ minWidth: "250px" }}>
          Descrption
        </th>*/}
        <th style={{ minWidth: "6%" }}></th>
      </tr>
    </thead>
  );
};
export default CreateEntryHead;
