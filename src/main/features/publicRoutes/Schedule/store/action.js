import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  GetReferenceByIdService,
  addScheduleByExternalService,
} from "../services/service";
import { openNotification } from "../../../../../utils/Shared/store/slice";
import { responseCode } from "../../../../../services/enums/responseCode";
import { message } from "antd";

export const GetReferenceById = createAsyncThunk("referenceId", async (id) => {
  try {
    const response = await GetReferenceByIdService(id);
    console.log(response.data, "action data");
    return response.data;
  } catch (error) {
    console.log(error.message);
    throw new Error(`Error Fething Data: ${error}`, { cause: error });
  }
});

export const addAppointmentByExternal = createAsyncThunk(
  "addSchedule",
  async (data, { dispatch, getState, rejectWithValue }) => {
    const res = await addScheduleByExternalService(data);
    if (res.responseCode === responseCode.Success) {
      dispatch(
        openNotification(message.success("Schedule Created Successfully"))
      );
      return res;
    } else {
      dispatch(
        openNotification({
          message: res.message,
          type: "error",
          duration: 2,
        })
      );
      return rejectWithValue(res.message);
    }
  }
);
