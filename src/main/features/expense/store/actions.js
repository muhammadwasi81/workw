import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import { responseCode } from "../../../../services/enums/responseCode";
import {
  responseMessage,
  responseMessageType,
} from "../../../../services/slices/notificationSlice";
import { ResponseType } from "../../../../utils/api/ResponseResult";
import { openNotification } from "../../../../utils/Shared/store/slice";

import {
  addExpenseService,
  getAllExpenseService,
  getExpenseByIDService,
} from "../services/service";

export const addExpense = createAsyncThunk(
  "expense/addexpense",
  async (args, { dispatch, getState }) => {
    const res = await addExpenseService(args);
    console.log(res, "res");
    if (res?.responseCode === responseCode.Success) {
      dispatch(
        openNotification({
          message: "Expense Created Successfully",
          type: "success",
          duration: 2,
        })
      );

      return res.data;
    } else {
      dispatch(
        openNotification({
          message: res.message,
          type: "error",
          duration: 2,
        })
      );
      return isRejectedWithValue(res.message);
    }
  }
);
export const getAllExpense = createAsyncThunk(
  "expense/getAllExpense",
  async (args, { dispatch, rejectWithValue }) => {
    const res = await getAllExpenseService(args);
    // console.log(res, "response");
    if (res?.responseCode === responseCode.Success) {
      return res;
    } else {
      responseMessage({
        dispatch: dispatch,
        data: "",
        type: responseMessageType.ApiFailure,
      });
    }
  }
);
export const getExpenseById = createAsyncThunk(
  "expense/getExpenseById",
  async (args, { dispatch, getState }) => {
    const res = await getExpenseByIDService(args);

    if (res?.responseCode === responseCode.Success) {
      return res;
    } else {
      responseMessage({
        dispatch: dispatch,
        type: responseMessageType.ApiFailure,
      });
    }
  }
);
