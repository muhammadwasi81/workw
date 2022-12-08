import React, { useEffect, useState, useContext } from "react";
// import CustomizedSnackbars from '../../snackbar/CustomizedSnackbars';
import VoucherFooter from "./components/VoucherFooter";
import CreateEntryHead from "./components/createEntryTableHead";
import CreateEntryItem from "./components/createEntryItem";
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getAllChartOfAccount } from "../../../chartOfAccount/store/actions";
import moment from "moment";
import { responseMessageType } from "../../../../../services/slices/notificationSlice";
import {
  getAllEmployees,
  getAllEmployeeShort,
} from "../../../../../utils/Shared/store/actions";
import { createGuid } from "../../../../../utils/base";
import { getAllAllowance } from "../../../allowance/store/actions";
import { addMultipleEmployeeSalary } from "../../store/actions";
import { useNavigate } from "react-router-dom";
import { salaryDictionaryList } from "../../localization/index";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";

const CreateSalaryVoucher = ({ defaultRows }) => {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { salaryDictionary } = salaryDictionaryList[userLanguage];
  const { createSalary } = salaryDictionary;
  const defaultEntry = {
    effectiveDate: moment(),
    userId: "",
    grade: "",
    basicSalary: 0,
    allowance: 0,
    deduction: 0,
    netSalary: 0,
    approvers: [],
    details: [],
    description: "",
    id: createGuid(),
  };

  const initialEntries = Array(defaultRows)
    .fill(defaultEntry)
    .map((item) => ({ ...item, id: createGuid() }));
  const [entries, setEntries] = useState(initialEntries);
  const [fetchEmployeesData, setFetchEmployeesData] = useState([]);
  const [isFirstTime, setIsFirstTime] = useState(true);
  const success = useSelector((state) => state.voucherSlice.success);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const employeesData = useSelector((state) => state.sharedSlice.employees);
  const employeesShortData = useSelector(
    (state) => state.sharedSlice.employeeShort
  );
  const allowanceData = useSelector((state) => state.allowanceSlice.allowances);

  useEffect(() => {
    fetchEmployees();
    fetchEmployeesShort();
    fetchAllowance();
  }, []);
  useEffect(() => {
    if (isFirstTime && employeesData.length > 0) {
      setFetchEmployeesData(employeesData);
      setIsFirstTime(false);
    }
  }, [employeesData]);

  const fetchEmployees = (text = "", pgNo = 1) => {
    dispatch(getAllEmployees({ text, pgNo, pgSize: 20 }));
  };
  const fetchEmployeesShort = (text = "", pgNo = 1) => {
    dispatch(getAllEmployeeShort({ text, pgNo, pgSize: 20 }));
  };
  const fetchAllowance = () => {
    dispatch(getAllAllowance());
  };
  useEffect(() => {
    if (success) {
      setEntries(Array(defaultRows).fill(defaultEntry));
    }
  }, [success]);

  const handleAddRow = () => {
    setEntries([...entries, defaultEntry]);
  };

  const handleRemoveRow = (index) => {
    console.log(index);
    let filteredRows = [...entries];
    filteredRows.splice(index, 1);
    setEntries(filteredRows);
  };

  const handleChange = (value, name, index) => {
    let tempEntries = [...entries];
    tempEntries[index] = {
      ...tempEntries[index],
      [name]: value,
    };
    setEntries(tempEntries);
  };
  const handleRowChange = (data, index) => {
    let tempEntries = [...entries];
    tempEntries[index] = data;
    setEntries(tempEntries);
  };

  const handleSubmit = () => {
    let filteredEntries = entries.filter((item) => item.userId);
    dispatch(
      addMultipleEmployeeSalary({
        navigate: navigate,
        salaries: filteredEntries,
      })
    );
  };
  return (
    <div className="createEntryTable">
      <div className="bg-white p-4 rounded-md ">
        <div className="overflow-x-auto">
          <table>
            <CreateEntryHead />
            <tbody>
              {entries.map((item, ind) => {
                return (
                  <CreateEntryItem
                    key={item.id}
                    index={ind}
                    handleChange={handleChange}
                    handleRowChange={handleRowChange}
                    handleRemoveRow={handleRemoveRow}
                    value={item}
                    fetchEmployees={fetchEmployees}
                    fetchEmployeesShort={fetchEmployeesShort}
                    employeesData={fetchEmployeesData}
                    employeesShortData={employeesShortData}
                    allowanceData={allowanceData}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
        <div>
          <div
            className="defaultBtn addRowBtn cursor-pointer"
            onClick={handleAddRow}
          >
            +
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-md flex w-full justify-between mt-5 sticky bottom-2">
        <div>
          {/* <Button className='ThemeBtn mr-2' onClick={() => setEntries(Array(defaultRows).fill(defaultEntry))} >
            Clear
          </Button> */}
          <Button className="ThemeBtn mr-2" onClick={handleSubmit}>
            {createSalary}
          </Button>
        </div>

        <VoucherFooter amount={0} />
      </div>
    </div>
  );
};
export default CreateSalaryVoucher;
