import { createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";
import { responseCode } from "../../../../services/enums/responseCode";
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

export const GetLoanById = createAsyncThunk("loans/GetLoanById", async (id) => {
  const response = await GetLoanByIdService(id);
  console.log("MY ID", id);
  return response.data;
});

// export const addReward = createAsyncThunk(
//   "Loan/addLoan",
//   async (data, { dispatch, setState }) => {
//     const response = await addLoanService(data);
//     console.log(response, "FROM ACTION");
//     return response;
//   }
// );
