import { Checkbox } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { handleChangePayrollItem } from "../../../store/slice";

const CreateEntryItem = ({ value, index }) => {
  let {
    user,
    basicSalary,
    grossSalary,
    loan,
    allowance,
    tax,
    rebate,
    bonus,
    other,
    netSalary,
    deduction,
    isChecked,
  } = value;
  const dispatch = useDispatch();
  const handleChangeCheck = (e) => {
    dispatch(
      handleChangePayrollItem({
        index,
        data: {
          ...value,
          isChecked: e.target.checked,
        },
      })
    );
  };
  return (
    <tr>
      <td className="!py-[2px] text-center">
        {" "}
        <Checkbox onChange={handleChangeCheck} checked={isChecked} />
      </td>
      <td>{user.name}</td>
      <td>{basicSalary}</td>
      {/* <td>{grossSalary}</td> */}
      <td>{loan}</td>
      <td>{allowance}</td>
      <td>{deduction}</td>
      <td>{tax}</td>
      <td>{rebate}</td>
      <td>{bonus}</td>
      <td>{other}</td>
      <td>{netSalary}</td>
    </tr>
  );
};
export default CreateEntryItem;
