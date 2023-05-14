import React, { useState, useContext } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import { ALLOWANCE_ENUM } from "../../../../allowance/view/enum";
import { calculateAllowance } from "../../../utils/constant";
import { quotationDictionaryList } from "../../../localization/index";
import { LanguageChangeContext } from "../../../../../../utils/localization/localContext/LocalContext";

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
  const { userLanguage } = useContext(LanguageChangeContext);
  const { quotationDictionary, Direction } = quotationDictionaryList[
    userLanguage
  ];
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

  // const onChangePrice = (price) => {
  //   let tempValue = {
  //     ...value,
  //     price: price,
  //   };
  //   handleRowChange({ ...tempValue }, index);
  // };

  const onChangeQuantity = (quantity) => {
    let tempValue = {
      ...value,
      quantity: quantity,
      totalAmount: value.price * quantity,
    };
    handleRowChange({ ...tempValue }, index);
  };
  const onChangePrice = (price) => {
    let tempValue = {
      ...value,
      price: price,
      totalAmount: price * value.quantity,
    };
    handleRowChange({ ...tempValue }, index);
  };

  return (
    <tr style={{ height: "30px" }} className="quotationRow">
      <td>{index + 1}</td>
      <td>
        <input
          placeholder={quotationDictionary.serviceItem}
          // onChange={(value) => handleChange(value, "effectiveDate", index)}
          onChange={handleInputChange}
          name="item"
        />
      </td>
      <td>
        <input
          // className="text-[#a7a7a7] font-bold"
          placeholder={quotationDictionary.price}
          name="price"
          // value={value.grade}
          // disabled={true}
          type="number"
          onChange={(e) => onChangePrice(e.target.value)}
        />
      </td>
      <td>
        <input
          placeholder={quotationDictionary.quantity}
          type="number"
          name="quantity"
          // onChange={(e) =>
          //   console.log(e.target.value, `quantity at index ${index}`)
          // }
          onChange={(e) => onChangeQuantity(e.target.value)}
        />
      </td>
      {/* <td>
        <input
          placeholder={quotationDictionary.tax}
          // type="number"
          value="0.5%"
          disabled={true}
        // onChange={(e) =>
        //   console.log(e.target.value, `quantity at index ${index}`)
        // }
        />
      </td> */}
      <td>
        <input
          placeholder={quotationDictionary.totalAmount}
          //  type="number"
          value={value.totalAmount}
          disabled={true}
          // onChange={(e) =>
          //   console.log(e.target.value, `quantity at index ${index}`)
          // }
        />
      </td>
      <td onClick={() => handleRemoveRow(index)}>
        <DeleteOutlined className="cursor-pointer" />
      </td>
    </tr>
  );
};
export default CreateEntryItem;
