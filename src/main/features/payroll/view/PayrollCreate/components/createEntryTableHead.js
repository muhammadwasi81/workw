import React, { useEffect, useState } from 'react';

const CreateEntryHead = () => {

  return (
    <thead>
      <tr className='whitespace-nowrap' >
        <th style={{ minWidth: "50px" }} >
          S.No.
        </th>
        <th style={{ minWidth: "200px" }}>
          Employee
        </th>
        <th style={{ minWidth: "120px" }}>
          Basic Salary
        </th>
        <th style={{ minWidth: "120px" }}>
          Gross Salary
        </th>
        <th style={{ minWidth: "100px" }}>
          Loan
        </th>
        <th style={{ minWidth: "100px" }}>
          Deduction
        </th>
        <th style={{ minWidth: "100px" }}>
          Tax
        </th>
        <th style={{ minWidth: "100px" }}>
          Rebate
        </th>
        <th style={{ minWidth: "100px" }}>
          Bonus
        </th>
        <th style={{ minWidth: "100px" }}>
        Other
        </th>
        <th style={{ minWidth: "100px" }}>
        Net Salary
        </th>
      </tr>
    </thead>
  )
}
export default CreateEntryHead;