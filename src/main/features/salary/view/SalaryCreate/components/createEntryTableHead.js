import React, { useEffect, useState } from 'react';

const CreateEntryHead = () => {

  return (
    <thead>
      <tr className='whitespace-nowrap' >
        <th style={{ minWidth: "50px" }} >
          S.No.
        </th>
        <th style={{ minWidth: "130px" }}>
          Effective Date
        </th>
        <th style={{ minWidth: "230px" }}>
          Employee
        </th>
        <th style={{ minWidth: "170px" }}>
          Grade
        </th>
        <th style={{ minWidth: "150px" }}>
          Basic Salary
        </th>
        <th style={{ minWidth: "150px" }}>
          Allowances
        </th>
        <th style={{ minWidth: "150px" }}>
          Net Salary
        </th>
        <th style={{ minWidth: "300px" }}>
          Approvers
        </th>
        <th style={{ minWidth: "250px" }}>
          Descrption
        </th>
        <th style={{ minWidth: "45px" }}>
        </th>
      </tr>
    </thead>
  )
}
export default CreateEntryHead;