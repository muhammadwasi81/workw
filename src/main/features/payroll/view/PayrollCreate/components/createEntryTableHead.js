import { Checkbox } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { handleChangeAllPayrollItem } from '../../../store/slice';

const CreateEntryHead = () => {
  const dispatch = useDispatch();
  const payrollCalculatedList = useSelector(state => state.payrollSlice.payrollCalculatedList);
  const handleChange = (event) => {
    dispatch(handleChangeAllPayrollItem(
      payrollCalculatedList.map((item)=>({
        ...item,
        isChecked:event.target.checked
      }))
    ))
  }
  return (
    <thead>
      <tr className='whitespace-nowrap' >
        <th style={{ minWidth: "30px" }} >
          <Checkbox onChange={handleChange}
            checked={payrollCalculatedList?.every((item) => item.isChecked)} />
        </th>
        <th style={{ minWidth: "200px" }}>
          Employee
        </th>
        <th style={{ minWidth: "120px" }}>
          Basic Salary
        </th>
        <th style={{ minWidth: "100px" }}>
          Loan
        </th>
        <th style={{ minWidth: "100px" }}>
          Allowance
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