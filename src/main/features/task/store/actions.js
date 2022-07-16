import { createAsyncThunk } from "@reduxjs/toolkit";
import { ResponseType } from "../../../../utils/api/ResponseResult";
import { jsonToFormData } from "../../../../utils/base";
import { openNotification } from "../../../../utils/Shared/store/slice";
import { addNewTaskService, getAllTaskService } from "../utils/services/service";

export const addNewTask = createAsyncThunk(
  "task/addNewTask",
  async (request, { rejectWithValue, dispatch }) => {
    const requestData = jsonToFormData(request);
    const response = await addNewTaskService(requestData);
    switch (response.type) {
      case ResponseType.ERROR:
        return rejectWithValue(response.errorMessage);
      case ResponseType.SUCCESS:
        dispatch(openNotification({
          message: "Task Create Successfully",
          style: { backgroundColor: "#48da00" },
          type:"success",
          duration: 2
        }))
        return response.data;
      default:
        return;
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