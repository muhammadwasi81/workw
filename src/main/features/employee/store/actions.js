import { createAsyncThunk } from "@reduxjs/toolkit";
import { responseCode } from "../../../../services/enums/responseCode";
import {
  responseMessage,
  responseMessageType,
} from "../../../../services/slices/notificationSlice";

import {
  addEmployeeService,
  getAllEmployeesService,
} from "../services/service";

export const addEmployee = createAsyncThunk(
  "addEmployee",
  async (
    { data, resetAllFields, handleIsSubmit },
    { dispatch, getState, rejectWithValue }
  ) => {
    const res = await addEmployeeService(data);
    if (res.responseCode === responseCode.Success) {
      responseMessage({
        dispatch: dispatch,
        data: res,
        type: responseMessageType.ApiSuccess,
      });
      for (let obj in resetAllFields) {
        resetAllFields[obj].resetFields();
      }
      handleIsSubmit();

      return res;
    } else {
      responseMessage({
        dispatch: dispatch,
        data: res,
        type: responseMessageType.ApiFailure,
      });
      return rejectWithValue(res.message);
    }
  }
);

export const getAllEmployees = createAsyncThunk(
  "getAllEmployees",
  async (data, { dispatch, getState, rejectWithValue }) => {
    const res = await getAllEmployeesService();
    if (res.responseCode === responseCode.Success) {
      return res;
    } else {
      responseMessage({
        dispatch: dispatch,
        data: res,
        type: responseMessageType.ApiFailure,
      });
      return rejectWithValue(res.message);
    }
  }
);
