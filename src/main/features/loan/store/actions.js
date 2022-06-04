import { createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";
import { responseCode } from "../../../../services/enums/responseCode";
import {
  responseMessage,
  responseMessageType,
} from "../../../../services/slices/notificationSlice";
import {
  addLoanService,
  getAllLoanService,
  getLoanByIdService,
} from "../services/service";

export const getAllLoan = createAsyncThunk("loan/GetAllLoan", async (data) => {
  const response = await getAllLoanService(data);

  if (!response.responseCode) {
    message.error("Something went wrong");
  }
  return response.data;
});

export const getLoanById = createAsyncThunk("loan/GetLoanById", async (id) => {
  const response = await getLoanByIdService(id);
  console.log("MY ID", id);
  return response.data;
});

export const addLoan = createAsyncThunk(
  "loan/AddLoan",
  async (args, { dispatch, setState }) => {
    const response = await addLoanService(args);
    console.log(args, "FROM ACTION");
    return response;
  }
);
