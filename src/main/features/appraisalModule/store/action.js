import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import { message } from "antd";
import { responseCode } from "../../../../services/enums/responseCode";
import { ResponseType } from "../../../../utils/api/ResponseResult";
import { openNotification } from "../../../../utils/Shared/store/slice";
import {
  getAllTaskForAppraisalService,
  getAllAppraisalService,
  addAppraisalService,
  getAllAppraisalByIdService,
} from "../service/service";

export const getAllTaskForAppraisalAction = createAsyncThunk(
  "appraisalModuleSlice/getAllTaskForAppraisalAction",
  async (request, { rejectWithValue }) => {
    console.log(request, "GET REQUEST appraisalModule");
    const response = await getAllTaskForAppraisalService(request);
    console.log(request, "GET REQUEST appraisalModule 22");

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

export const getAllAppraisalAction = createAsyncThunk(
  "appraisalModuleSlice/getAllAppraisalAction",
  async (request, { rejectWithValue }) => {
    const response = await getAllAppraisalService(request);
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

export const getAllAppraisalByIdAction = createAsyncThunk(
  "appraisalModuleSlice/getAllAppraisalByIdAction",
  async (request, { rejectWithValue }) => {
    console.log(request, "GET REQUEST appraisalModule");
    const response = await getAllAppraisalByIdService(request);
    console.log(request, "GET REQUEST appraisalModule 22");

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

export const addAppraisal = createAsyncThunk(
  "appraisalModuleSlice/addAppraisal",
  async (data, { dispatch, rejectWithValue }) => {
    const res = await addAppraisalService(data);

    switch (res.type) {
      case ResponseType.ERROR:
        dispatch(
          openNotification({
            message: res.errorMessage,
            type: "error",
          })
        );
        return rejectWithValue(res.errorMessage);
      case ResponseType.SUCCESS:
        dispatch(
          openNotification({
            message: "Appraisal Create Successfully",
            type: "success",
            duration: 2,
          })
        );
        return res.data;
      default:
        return;
    }
  }
);
