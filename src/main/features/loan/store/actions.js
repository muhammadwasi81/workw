import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import { message } from "antd";
import { responseCode } from "../../../../services/enums/responseCode";
import { openNotification } from "../../../../utils/Shared/store/slice";
import {
  responseMessage,
  responseMessageType,
} from "../../../../services/slices/notificationSlice";
import {
  getAllLoanService,
  addLoanService,
  GetLoanByIdService,
} from "../services/service";

//Done
export const getAllLoans = createAsyncThunk(
  "loans/GetAllLoan",
  async (data) => {
    const response = await getAllLoanService(data);

    if (!response.responseCode) {
      message.error("Something went wrong");
    }
    // console.log("response data from actions", response.data);
    return response.data;
  }
);

//done
export const GetLoanById = createAsyncThunk("loans/GetLoanById", async (id) => {
  const response = await GetLoanByIdService(id);
  console.log("MY ID", id);
  return response.data;
});

//working
// export const addLoan = createAsyncThunk(
//   "Loan/addLoan",
//   async (data, { dispatch, setState }) => {
//     console.log(data, "this is data in add loan actions");
//     const { loanObj } = data;
//     const response = await addLoanService(loanObj);
//     // console.log(response, "FROM ACTION");
//     return response;
//   }
// );

export const addLoan = createAsyncThunk(
  "Loan/addLoan",
  async (args, { dispatch, getState }) => {
    const { loanObj } = args;
    const res = await addLoanService(loanObj);

    if (res.data?.responseCode === responseCode.Success) {
      dispatch(
        openNotification({
          message: "Loan Created Successfully",
          type: "success",
          duration: 2,
        })
      );
      console.log("response when success", res.data);
      return res.data;
    } else {
      dispatch(
        openNotification({
          message: res.message,
          type: "error",
          duration: 2,
        })
      );
      console.log("response when failed", res.data);
      return isRejectedWithValue(res.data.message);
    }
  }
);
