import { createAsyncThunk } from "@reduxjs/toolkit";
import { ResponseType } from "../../../../utils/api/ResponseResult";
import { jsonToFormData } from "../../../../utils/base";
import { openNotification } from "../../../../utils/Shared/store/slice";
import { getAllChartOfAccountService } from "../services/service";

export const addChartOfAccount = createAsyncThunk(
  "ChartOfAccount/addChartOfAccount",
  async (request, { rejectWithValue, dispatch }) => {
    const requestData = jsonToFormData(request);
    const response = await addChartOfAccount(requestData);
    switch (response.type) {
      case ResponseType.ERROR:
        return rejectWithValue(response.errorMessage);
      case ResponseType.SUCCESS:
        dispatch(openNotification({
          message: "ChartOfAccount Create Successfully",
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
export const getAllChartOfAccount = createAsyncThunk(
  "ChartOfAccount/getAllChartOfAccount",
  async (request, { rejectWithValue }) => {
    const response = await getAllChartOfAccountService(request);
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