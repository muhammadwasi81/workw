import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import { responseCode } from "../../../../services/enums/responseCode";
import { ResponseType } from "../../../../utils/api/ResponseResult";
import { openNotification } from "../../../../utils/Shared/store/slice";
import {
  addNewTaskService,
  getAllTaskService,
  getTaskByIdService,
} from "../utils/services/service";

export const addNewTask = createAsyncThunk(
  "task/addNewTask",
  async (request, { rejectWithValue, dispatch }) => {
    const res = await addNewTaskService(request);
    if (res?.responseCode === responseCode.Success) {
      console.log("response ture condition");
      dispatch(
        openNotification({
          message: "User Task Created Successfully",
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
export const getAllTask = createAsyncThunk(
  "task/getAllTask",
  async (request, { rejectWithValue }) => {
    const response = await getAllTaskService(request);
    switch (response.type) {
      case ResponseType.ERROR:
        return rejectWithValue(response.errorMessage);
      case ResponseType.SUCCESS:
        return response.data;
      default:
        return;
    }
  }
);

export const getTaskById = createAsyncThunk(
  "task/getTaskById",
  async (id, { rejectWithValue }) => {
    const response = await getTaskByIdService(id);
    switch (response.type) {
      case ResponseType.ERROR:
        return rejectWithValue(response.errorMessage);
      case ResponseType.SUCCESS:
        return response.data;
      default:
        return;
    }
  }
);
