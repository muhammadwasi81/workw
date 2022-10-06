import { createAsyncThunk } from "@reduxjs/toolkit";
import { responseCode } from "../../../../services/enums/responseCode";
import MasterConfig from "../../../../utils/services/MasterConfig";
import {
  responseMessage,
  responseMessageType,
} from "../../../../services/slices/notificationSlice";
import AxiosConfig from "../../../../utils/services/AxiosConfig";
import { addExpenseHeaderService, getAllExpenseHeaderService } from "../services/service";
import { expenseDeleted } from "./slice";
import { message } from "antd";

const API_PREFIX = "konnectapi/api/expenseheader/";

export const getAllExpense = createAsyncThunk(
  "expenseheader/getAllexpense",
  async (args, { dispatch, getState }) => {
    const res = await getAllExpenseHeaderService();

    if (!res.responseCode) {
      responseMessage({
        dispatch: dispatch,
        type: responseMessageType.ApiFailure,
      });
    }
    return res;
  }
);

export const addExpense = createAsyncThunk(
  "expenseheader/addexpense",
  async (args, { dispatch, getState }) => {
    const res = await addExpenseHeaderService(args);

    if (res.responseCode) {
      if (res.responseCode === responseCode.Success) {
        message.success("Expense added successfully!")
        return res
      } else {
        message.error(res.message)
      }
    }
    return res;
  }
);

export const updateExpense = createAsyncThunk(
  "expenseheader/updateExpense",
  async (args, { dispatch, getState }) => {
    return await MasterConfig.put(`api/ExpenseHeader/UpdateExpenseHeader`, args)
      .then((res) => {
        if (res.data.responseCode === responseCode.Success) {
          message.success("Expense updated successfully!")
          return res.data;
        } else {
          message.error(res.message)
          return res.data;
        }
      })
      .catch((err) => {
        responseMessage({
          dispatch: dispatch,
          type: responseMessageType.ApiFailure,
        });
        return err;
      });
  }
);

export const removeExpense = createAsyncThunk(
  "expenseheader/removeExpenseHeader",
  async (args, { dispatch, getState }) => {
    return await MasterConfig.delete(`api/expenseHeader/removeexpenseHeader?id=${args.id}`)
      .then((res) => {
        if (res.data.responseCode === responseCode.Success) {
          message.success("Expense Header removed successfully!")
          dispatch(expenseDeleted(args));
        }
        return res.data;
      })
      .catch((err) => {
        responseMessage({
          dispatch: dispatch,
          type: responseMessageType.ApiFailure,
        });
        return err;
      });
  }
);
