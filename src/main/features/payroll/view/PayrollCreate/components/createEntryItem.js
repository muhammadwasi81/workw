import { DatePicker, Select } from 'antd';
import { Option } from 'antd/lib/mentions';
import React from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import { getAllEmployees } from '../../../../../../utils/Shared/store/actions';
import Avatar from "../../../../../sharedComponents/Avatar/avatarOLD";
import CustomSelect from "../../../../../sharedComponents/AntdCustomSelects/SharedSelects/MemberSelect";
import { ALLOWANCE_ENUM } from '../../../../allowance/view/enum';

const CreateEntryItem = ({
  index,
  handleChange,
  handleRowChange,
  handleRemoveRow,
  value,
  fetchEmployees = () => { },
  employeesData = [],
  fetchEmployeesShort = () => { },
  employeesShortData = [],
  allowanceData = []
}) => {

  const calculateAllowance = (allowanceData = [], gradeId = null, basicSalary = 0) => {
    let totalAllowance = 0;
    let totalDeductions = 0;
    // Filteration of Allowances behalf of Grade, AllowanceUnit & Allowance Type =>
    let filteredAllowance = allowanceData.filter(item => item.gradeName === gradeId);
    let filterBenefit = filteredAllowance.filter(item => item.allowanceUnit === ALLOWANCE_ENUM.UNIT.BENEFIT);
    let filterDeduction = filteredAllowance.filter(item => item.allowanceUnit === ALLOWANCE_ENUM.UNIT.DEDUCTION);
    let filterBenefit_inPercent = filterBenefit.filter(item => item.allowanceType === ALLOWANCE_ENUM.TYPE.PERCENT);
    let filterBenefit_inAmount = filterBenefit.filter(item => item.allowanceType === ALLOWANCE_ENUM.TYPE.AMOUNT);
    let filterDeduction_inPercent = filterDeduction.filter(item => item.allowanceType === ALLOWANCE_ENUM.TYPE.PERCENT);
    let filterDeduction_inAmount = filterDeduction.filter(item => item.allowanceType === ALLOWANCE_ENUM.TYPE.AMOUNT);
    // Add all Benefits & Deduction in Amount =>
    totalAllowance += filterBenefit_inAmount.reduce((a, b) => a + b.value, 0);
    totalDeductions += filterDeduction_inAmount.reduce((a, b) => a + b.value, 0);
    // Calculate Benefits & Deduction Percent of Basic Salary then add =>
    totalAllowance += filterBenefit_inPercent.reduce((a, b) => a + (b.value / 100 * basicSalary), 0);
    totalDeductions += filterDeduction_inPercent.reduce((a, b) => a + (b.value / 100 * basicSalary), 0);
    // then return final result
    return {
      totalAllowance,
      totalDeductions
    }
  }

  const handleInputChange = (e) => {
    handleChange(e.target.value, e.target.name, index)
  }
  const onEmployeeSelect = (row) => {
    // console.log(row, "row")
    let { gradeId, grade } = row[0];
    let { totalAllowance, totalDeductions } = calculateAllowance(grade, value.basicSalary);
    let tempValue = {
      ...value,
      grade,
      allowance: totalAllowance,
      deduction: totalDeductions,
      netSalary: (value.basicSalary) + totalAllowance - totalDeductions
    };
    handleRowChange({
      ...tempValue
    }, index)
  }
  const onChangeSalary = (salaryInput) => {
    // console.log(row, "row")
    let { totalAllowance, totalDeductions } = calculateAllowance(value.grade, salaryInput);
    let tempValue = {
      ...value,
      allowance: totalAllowance,
      basicSalary: Number(salaryInput),
      deduction: totalDeductions,
      netSalary: Number(salaryInput) + totalAllowance - totalDeductions,
    };
    handleRowChange({
      ...tempValue
    }, index)
  }
  return (
    <tr>
     <td>100</td>
     <td>100</td>
     <td>100</td>
     <td>100</td>
     <td>100</td>
     <td>100</td>
     <td>100</td>
     <td>100</td>
     <td>100</td>
     <td>100</td>
     <td>100</td>
    </tr>
  )
}
export default CreateEntryItem;