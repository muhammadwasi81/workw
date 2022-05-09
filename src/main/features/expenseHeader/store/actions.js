import { createAsyncThunk } from "@reduxjs/toolkit";
import { responseCode } from "../../../../services/enums/responseCode";
import {
  responseMessage,
  responseMessageType,
} from "../../../../services/slices/notificationSlice";
import AxiosConfig from "../../../../utils/services/AxiosConfig";
import { addExpenseHeaderService, getAllExpenseHeaderService } from "../services/service";
import { expenseDeleted } from "./slice";

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
      if (res.responseCode === responseCode.Success)
        res.message = "Expense added successfully!";
      responseMessage({ dispatch, data: res });
    } else {
      responseMessage({
        dispatch: dispatch,
        type: responseMessageType.ApiFailure,
      });
    }

    return res;
  }
);

export const updateExpense = createAsyncThunk(
  "expenseheader/updateExpense",
  async (args, { dispatch, getState }) => {
    return await AxiosConfig.put(`${API_PREFIX}updateexpense`, args)
      .then((res) => {
        if (res.data.responseCode === responseCode.Success)
          res.data.message = "Expense updated successfully!";
        responseMessage({ dispatch, data: res.data });
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

export const removeExpense = createAsyncThunk(
  "expenseheader/removeExpense",
  async (args, { dispatch, getState }) => {
    return await AxiosConfig.delete(`${API_PREFIX}removeexpense?id=${args.id}`)
      .then((res) => {
        if (res.data.responseCode === responseCode.Success) {
          res.data.message = "Expense removed successfully!";
          dispatch(expenseDeleted(args));
        }
        responseMessage({ dispatch, data: res.data });
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
