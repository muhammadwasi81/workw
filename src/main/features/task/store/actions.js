import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import { responseCode } from "../../../../services/enums/responseCode";
import { ResponseType } from "../../../../utils/api/ResponseResult";
import { openNotification } from "../../../../utils/Shared/store/slice";
import {
  addNewTaskService,
  getAllTaskService,
  getTaskByIdService,
  cancelTaskService,
} from "../utils/services/service";
import { cancelTaskSuccess } from "./taskSlice";
import { useDispatch } from "react-redux";

export const addNewTask = createAsyncThunk(
  "task/addNewTask",
  async (request, { rejectWithValue, dispatch }) => {
    const res = await addNewTaskService(request);
    if (res?.responseCode === responseCode.Success) {
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
export const cancelTaskAction = createAsyncThunk(
  "task/cancelTaskAction",
  async (id, { rejectWithValue, dispatch }) => {
    const response = await cancelTaskService(id);
    switch (response.type) {
      case ResponseType.ERROR:
        return rejectWithValue(response.errorMessage);
      case ResponseType.SUCCESS:
        dispatch(
          openNotification({
            message: response.message,
            type: "error",
            duration: 2,
          })
        );
        dispatch(cancelTaskSuccess({ taskId: id }));
        return response.data;
      default:
        return;
    }
  }
);
