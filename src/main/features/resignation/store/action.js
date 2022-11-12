import { createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";
import { addResignationService, cancelResignationService, getAllResignationService, getResignationyByIdService } from "../services/service";
import { responseCode } from "../../../../services/enums/responseCode";
import { ResponseType } from "../../../../utils/api/ResponseResult";
import { openNotification } from "../../../../utils/Shared/store/slice";
import { cancelResignationSuccess } from "./slice";

export const getAllResignations = createAsyncThunk("Resignation/GetAllResignation", async (data) => {
  const response = await getAllResignationService(data);

  if (!response.responseCode) {
    message.error("Something went wrong");
  }
  return response.data;
});

export const addResignation = createAsyncThunk("Resgination/addResignation", async (data, { dispatch, getState, rejectWithValue }) => {
  const res = await addResignationService(data);
  if (res.data?.responseCode === responseCode.Success) {
    message.success('Resignation Created');
    return res;
  } else {
    message.error(res.data.message);
    return rejectWithValue(res.data.message);
  }
});

export const GetResignationById = createAsyncThunk("Resignation/GetResignationById", async (id) => {
  const response = await getResignationyByIdService(id);
  return response.data;
});

export const cancelResignationAction = createAsyncThunk(
  "Resignation/cancelResignationAction",
  async (id, { rejectWithValue, dispatch }) => {
    const response = await cancelResignationService(id);
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
        dispatch(cancelResignationSuccess({ resignationId: id }));
        return response.data;
      default:
        return;
    }
  }
);