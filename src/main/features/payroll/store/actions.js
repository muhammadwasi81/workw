import { createAsyncThunk } from "@reduxjs/toolkit";
import { responseMessage, responseMessageType } from "../../../../services/slices/notificationSlice";
import { ResponseType } from "../../../../utils/api/ResponseResult";
import { addPayrollService, getAllPayrollService, getCalculatedPayrollService } from "../services/service";

export const getCalculatedPayroll = createAsyncThunk(
  "Payroll/getCalculatedPayroll",
  async (data, { rejectWithValue, dispatch }) => {
    const response = await getCalculatedPayrollService(data);
    switch (response.type) {
      case ResponseType.ERROR:
        responseMessage({
          dispatch: dispatch,
          type: responseMessageType.ApiFailure,
          data: {
            message: response.errorMessage
          }
        });
        return rejectWithValue(response.errorMessage);
      case ResponseType.SUCCESS:
        return response.data;
      default:
        return;
    }
  }
);

export const getAllPayroll = createAsyncThunk(
  "Payroll/getAllPayroll",
  async (data, { rejectWithValue, dispatch }) => {
    const response = await getAllPayrollService(data);
    switch (response.type) {
      case ResponseType.ERROR:
        responseMessage({
          dispatch: dispatch,
          type: responseMessageType.ApiFailure,
          data: {
            message: response.errorMessage
          }
        });
        return rejectWithValue(response.errorMessage);
      case ResponseType.SUCCESS:
        return response.data;
      default:
        return;
    }
  }
);

export const addPayroll = createAsyncThunk(
  "Payroll/addPayroll",
  async (data, { rejectWithValue, dispatch }) => {
    const response = await addPayrollService(data);
    switch (response.type) {
      case ResponseType.ERROR:
        responseMessage({
          dispatch: dispatch,
          type: responseMessageType.ApiFailure,
          data: {
            message: response.errorMessage
          }
        });
        return rejectWithValue(response.errorMessage);
      case ResponseType.SUCCESS:
        return response.data;
      default:
        return;
    }
  }
);