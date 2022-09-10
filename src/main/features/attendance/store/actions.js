import { createAsyncThunk } from "@reduxjs/toolkit";
import { responseMessage, responseMessageType } from "../../../../services/slices/notificationSlice";
import { ResponseType } from "../../../../utils/api/ResponseResult";
import { AddAttendanceCheckInService, GetAttendanceLastCheckInService } from "../services/service";

export const addAttendanceCheckIn = createAsyncThunk(
  "Attendance/addAttendanceCheckIn",
  async (request, { rejectWithValue, dispatch }) => {
    const response = await AddAttendanceCheckInService(request);
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
        return null;
    }
  }
); 
export const getAttendanceLastCheckIn = createAsyncThunk(
  "Attendance/getAttendanceLastCheckIn",
  async (request, { rejectWithValue, dispatch }) => {
    const response = await GetAttendanceLastCheckInService(request);
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
        return null;
    }
  }
);
