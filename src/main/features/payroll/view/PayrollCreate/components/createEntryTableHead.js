import { Checkbox } from "antd";
import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { handleChangeAllPayrollItem } from "../../../store/slice";
import { payrollDictionaryList } from "../../../localization/index";
import { LanguageChangeContext } from "../../../../../../utils/localization/localContext/LocalContext";

const CreateEntryHead = () => {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { payrollDictionary, Direction } = payrollDictionaryList[userLanguage];
  const dispatch = useDispatch();
  const payrollCalculatedList = useSelector(
    (state) => state.payrollSlice.payrollCalculatedList
  );
  const handleChange = (event) => {
    dispatch(
      handleChangeAllPayrollItem(
        payrollCalculatedList.map((item) => ({
          ...item,
          isChecked: event.target.checked,
        }))
      )
    );
  };
  return (
    <thead>
      <tr className="whitespace-nowrap">
        <th style={{ minWidth: "30px" }}>
          <Checkbox
            onChange={handleChange}
            checked={payrollCalculatedList?.every((item) => item.isChecked)}
          />
        </th>
        <th style={{ minWidth: "200px" }}>{payrollDictionary.employee}</th>
        <th style={{ minWidth: "120px" }}>{payrollDictionary.basicSalary}</th>
        <th style={{ minWidth: "100px" }}>{payrollDictionary.loan}</th>
        <th style={{ minWidth: "100px" }}>{payrollDictionary.allowance}</th>
        <th style={{ minWidth: "100px" }}>{payrollDictionary.deduction}</th>
        <th style={{ minWidth: "100px" }}>{payrollDictionary.tax}</th>
        <th style={{ minWidth: "100px" }}>{payrollDictionary.rebate}</th>
        <th style={{ minWidth: "100px" }}>{payrollDictionary.bonus}</th>
        <th style={{ minWidth: "100px" }}>{payrollDictionary.other}</th>
        <th style={{ minWidth: "100px" }}>{payrollDictionary.netSalary}</th>
      </tr>
    </thead>
  );
};
export default CreateEntryHead;
