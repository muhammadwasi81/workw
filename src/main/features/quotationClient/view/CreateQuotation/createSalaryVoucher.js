import React, { useEffect, useState, useRef } from "react";
// import CustomizedSnackbars from '../../snackbar/CustomizedSnackbars';
import VoucherFooter from "./components/VoucherFooter";
import CreateEntryHead from "./components/createEntryTableHead";
import CreateEntryItem from "./components/createEntryItem";
import { Button, message } from "antd";
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
import { createClientQuotation } from "../../store/actions";
import { useNavigate } from "react-router-dom";
import CreateQuotationOptions from "./components/CreateQuotationOptions";
import getStoredState from "redux-persist/es/getStoredState";

// function usePrevious(value) {
//   const ref = useRef();
//   useEffect(() => {
//     ref.current = value;
//   });
//   return ref.current;
// }

const CreateQoutationVoucher = ({ defaultRows }) => {
  // const ref = useRef();
  const defaultEntry = {
    item: "",
    price: 0,
    quantity: 0,
    tax: 0.5,
    totalAmount: 0,
    id: createGuid(),
  };

  let initialState = {
    name: "",
    email: "",
    phoneNumber: "",
    quotationClientDate: "",
    //TODO: approvers Id to be set for post API
    approvers: [],
    clientDetails: [],
  };

  const initialEntries = Array(defaultRows)
    .fill(defaultEntry)
    .map((item) => ({ ...item, id: createGuid() }));
  const [entries, setEntries] = useState(initialEntries);
  const [fetchEmployeesData, setFetchEmployeesData] = useState([]);
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [totalAmount, setTotalAmount] = useState(0);
  const [quotationClientDetails, setquotationClientDetails] = useState(
    initialState
  );
  const success = useSelector((state) => state.voucherSlice.success);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const employeesData = useSelector((state) => state.sharedSlice.employees);
  const employeesShortData = useSelector(
    (state) => state.sharedSlice.employeeShort
  );
  const allowanceData = useSelector((state) => state.allowanceSlice.allowances);

  useEffect(() => {
    if (entries.totalAmount > 0) {
      setTotalAmount(...(totalAmount + entries.totalAmount));
    }
  }, [entries]);

  const prevState = useRef({ quotationClientDetails }).current;

  useEffect(() => {
    console.log("details change");
    console.log(prevState.quotationClientDetails);
    console.log(quotationClientDetails);
    //TODO: check initial data is empty
    if (quotationClientDetails.clientDetails.length === 1) {
      if (prevState.quotationClientDetails !== quotationClientDetails) {
        dispatch(createClientQuotation(quotationClientDetails));
        navigate(-1);
      }
    }
    //TODO: check
    if (quotationClientDetails.clientDetails.length > 1) {
      if (prevState.quotationClientDetails !== quotationClientDetails) {
        dispatch(createClientQuotation(quotationClientDetails));
        navigate(-1);
      }
    }
  }, [quotationClientDetails.clientDetails]);

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
    console.log("clickeddddd");
    setEntries([...entries, defaultEntry]);
  };

  const handleRemoveRow = (index) => {
    console.log(index);
    let filteredRows = [...entries];
    filteredRows.splice(index, 1);
    setEntries(filteredRows);
  };

  const handleChange = (value, name, index) => {
    console.log(value, name, index);
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
    let filteredEntries = entries.filter((item) => item.item);
    // console.log(filteredEntries);
    setquotationClientDetails({
      ...quotationClientDetails,
      clientDetails: filteredEntries,
    });
    // console.log(quotationClientDetails);
    if (quotationClientDetails.name.length === 0) {
      message.error(`Client's Name Required`);
      return;
    }
    if (quotationClientDetails.email.length === 0) {
      message.error(`Client's email Required`);
      return;
    }
    if (quotationClientDetails.phoneNumber.length === 0) {
      message.error(`Client's Phone Required`);
      return;
    }
    if (quotationClientDetails.approvers.length === 0) {
      message.error(`Approvers Required`);
      return;
    }
  };
  return (
    <div className="createEntryTable">
      <CreateQuotationOptions
        data={quotationClientDetails}
        handleChange={(value) => setquotationClientDetails(value)}
      />
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
            Create Quotation
          </Button>
        </div>

        <VoucherFooter amount={totalAmount} />
      </div>
    </div>
  );
};
export default CreateQoutationVoucher;
