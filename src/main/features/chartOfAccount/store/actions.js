import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import { disable } from "darkreader";
import { responseCode } from "../../../../services/enums/responseCode";
import {
	responseMessage,
	responseMessageType,
} from "../../../../services/slices/notificationSlice";
import { ResponseType } from "../../../../utils/api/ResponseResult";
import { jsonToFormData } from "../../../../utils/base";
import { openNotification } from "../../../../utils/Shared/store/slice";
import { addChartOfAccountService, getAllChartOfAccountService, updateChartOfAccountService } from "../services/service";
import { handleEdit } from "./slice";

export const addChartOfAccount = createAsyncThunk(
  "ChartOfAccount/addChartOfAccount",
  async (request, { rejectWithValue, dispatch }) => {
    const response = await addChartOfAccountService(request);
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

export const updateChartOfAccount = createAsyncThunk(
	"updateChartOfAccount",
	async (data, { dispatch, getState, rejectWithValue }) => {
		const res = await updateChartOfAccountService(data);
		if (res.responseCode === responseCode.Success) {
      dispatch(handleEdit(null))
			return res;
		} else {
			responseMessage({
				dispatch: dispatch,
				type: responseMessageType.ApiFailure,
			});
			return rejectWithValue("Something went wrong");
		}
	}
);