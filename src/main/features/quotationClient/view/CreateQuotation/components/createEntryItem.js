import { DatePicker, Input, Select } from "antd";
import { Option } from "antd/lib/mentions";
import React, { useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import { getAllEmployees } from "../../../../../../utils/Shared/store/actions";
import Avatar from "../../../../../sharedComponents/Avatar/avatarOLD";
import CustomSelect from "../../../../../sharedComponents/AntdCustomSelects/SharedSelects/MemberSelect";
import { ALLOWANCE_ENUM } from "../../../../allowance/view/enum";
import { calculateAllowance } from "../../../utils/constant";

const CreateEntryItem = ({
  index,
  handleChange,
  handleRowChange,
  handleRemoveRow,
  value,
  fetchEmployees = () => {},
  employeesData = [],
  fetchEmployeesShort = () => {},
  employeesShortData = [],
  allowanceData = [],
}) => {
  const handleInputChange = (e) => {
    handleChange(e.target.value, e.target.name, index);
  };

  const onEmployeeSelect = (row) => {
    let { gradeId, grade, id } = row[0];
    let { totalAllowance, totalDeductions, details } = calculateAllowance(
      allowanceData,
      gradeId,
      value.basicSalary
    );
    let tempValue = {
      ...value,
      userId: id,
      details,
      grade,
      gradeId,
      allowance: totalAllowance,
      deduction: totalDeductions,
      netSalary: value.basicSalary + totalAllowance - totalDeductions,
    };
    handleRowChange(
      {
        ...tempValue,
      },
      index
    );
  };
  const onChangeSalary = (salaryInput) => {
    // console.log(row, "row")
    let { totalAllowance, totalDeductions, details } = calculateAllowance(
      allowanceData,
      value.gradeId,
      salaryInput
    );
    let tempValue = {
      ...value,
      details,
      allowance: totalAllowance,
      basicSalary: Number(salaryInput),
      deduction: totalDeductions,
      netSalary: Number(salaryInput) + totalAllowance - totalDeductions,
    };
    handleRowChange(
      {
        ...tempValue,
      },
      index
    );
  };

  const onChangePrice = (price) => {
    let tempValue = {
      ...value,
      price: price,
    };
    handleRowChange(
      {
        ...tempValue,
      },
      index
    );
  };

  const onChangeQuantity = (quantity) => {
    let tax = value.price * quantity * 0.005;
    let tempValue = {
      ...value,
      quantity: quantity,
      totalAmount: value.price * quantity + tax,
    };
    handleRowChange(
      {
        ...tempValue,
      },
      index
    );
  };

  return (
    <tr>
      <td>{index + 1}</td>
      <td>
        {/* <DatePicker
          value={value.effectiveDate}
          onChange={(value) => handleChange(value, "effectiveDate", index)}
        /> */}
        <input
          placeholder="Service/Item"
          // onChange={(value) => handleChange(value, "effectiveDate", index)}
          onChange={handleInputChange}
          name="item"
        />
      </td>
      <td>
        {/* <CustomSelect
          style={{ marginBottom: "0px" }}
          data={employeesShortData}
          selectedData={(value, row) => onEmployeeSelect(row)}
          canFetchNow={employeesShortData && employeesShortData.length > 0}
          fetchData={fetchEmployeesShort}
          sliceName="employeeShort"
          placeholder={"Employee"}
          isObject={true}
          size={"medium"}
          loadDefaultData={false}
          formItem={false}
          optionComponent={(opt) => {
            return (
              <>
                <Avatar
                  name={opt.name}
                  src={opt.image}
                  round={true}
                  width={"30px"}
                  height={"30px"}
                />
                {opt.name}
              </>
            );
          }}
          dataVal={[]}
          name="Employee"
          showSearch={true}
        /> */}
        <input
          // className="text-[#a7a7a7] font-bold"
          placeholder="Price"
          name="price"
          // value={value.grade}
          // disabled={true}
          type="number"
          onChange={(e) => onChangePrice(e.target.value)}
        />
      </td>
      <td>
        <input
          placeholder="Quantity"
          type="number"
          name="quantity"
          // onChange={(e) =>
          //   console.log(e.target.value, `quantity at index ${index}`)
          // }
          onChange={(e) => onChangeQuantity(e.target.value)}
        />
      </td>
      <td>
        <input
          placeholder="Tax"
          // type="number"
          value="0.5%"
          disabled={true}
          // onChange={(e) =>
          //   console.log(e.target.value, `quantity at index ${index}`)
          // }
        />
      </td>
      <td>
        <input
          placeholder="Total"
          //  type="number"
          value={value.totalAmount}
          disabled={true}
          // onChange={(e) =>
          //   console.log(e.target.value, `quantity at index ${index}`)
          // }
        />
      </td>
      {/* <td>
        <input
          className="text-[#a7a7a7] font-bold"
          value={value.deduction}
          disabled={true}
        />
      </td>
      <td>
        <input
          className="text-[#a7a7a7] font-bold"
          value={value.netSalary}
          disabled={true}
        />
      </td>
      <td className="removeMargin">
        <CustomSelect
          style={{ marginBottom: "0px" }}
          data={employeesData}
          selectedData={(value, row) =>
            handleChange(
              row.map((item) => ({ approverId: item.id })),
              "approvers",
              index
            )
          }
          canFetchNow={employeesData && employeesData.length > 0}
          fetchData={fetchEmployees}
          placeholder={"Approvers"}
          mode={"multiple"}
          isObject={true}
          size="small"
          loadDefaultData={false}
          formItem={false}
          optionComponent={(opt) => {
            return (
              <>
                <Avatar
                  name={opt.name}
                  src={opt.image}
                  round={true}
                  width={"30px"}
                  height={"30px"}
                />
                {opt.name}
              </>
            );
          }}
          dataVal={[]}
          name="approvers"
          showSearch={true}
        />
      </td>
      <td>
        <input
          name="description"
          onChange={handleInputChange}
          value={value.description}
        />
      </td> */}

      <td onClick={() => handleRemoveRow(index)}>
        <DeleteOutlined />
      </td>
    </tr>
  );
};
export default CreateEntryItem;
