import { createAsyncThunk } from "@reduxjs/toolkit";
import { responseCode } from "../../../../services/enums/responseCode";
import {
  responseMessage,
  responseMessageType,
} from "../../../../services/slices/notificationSlice";

import {
  addExpenseService,
  getAllExpenseService,
  getExpenseByIDService,
} from "../services/service";

export const addExpense = createAsyncThunk(
  "expense/addexpense",
  async (args, { dispatch, getState }) => {
    const res = await addExpenseService(args);

    if (res.responseCode === responseCode.Success) {
      return res;
    } else {
      responseMessage({
        dispatch: dispatch,
        type: responseMessageType.ApiFailure,
      });
    }

    return res;
  }
);
export const getAllExpense = createAsyncThunk(
  "expense/getAllExpense",
  async (args, { dispatch, getState }) => {
    const res = await getAllExpenseService(args);

    if (res.responseCode === responseCode.Success) {
      return res;
    } else {
      responseMessage({
        dispatch: dispatch,
        type: responseMessageType.ApiFailure,
      });
    }
  }
);
export const getExpenseById = createAsyncThunk(
  "expense/getExpenseById",
  async (args, { dispatch, getState }) => {
    const res = await getExpenseByIDService(args);

    if (res.responseCode === responseCode.Success) {
      return res;
    } else {
      responseMessage({
        dispatch: dispatch,
        type: responseMessageType.ApiFailure,
      });
    }
  }
);
