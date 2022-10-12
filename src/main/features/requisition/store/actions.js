import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import { message } from "antd";
import { responseCode } from "../../../../services/enums/responseCode";
import { openNotification } from "../../../../utils/Shared/store/slice";
import { addRequisitionService, getAllRequisitionService, GetRequisitionByIdService } from "../services/service";

export const getAllRequisition = createAsyncThunk("Requisition/GetAllRequisition", async (data) => {
  const response = await getAllRequisitionService(data);

  if (!response.responseCode) {
    message.error("Something went wrong");
  }
  return response.data;
});

export const GetRequisitionById = createAsyncThunk("Requisition/GetRequisitionById", async (id) => {
  const response = await GetRequisitionByIdService(id);
  return response.data;
});

export const addRequisition = createAsyncThunk("Requisition/addRequisition", async (data, { dispatch, getState, rejectWithValue }) => {
  const res = await addRequisitionService(data);
  console.log(res.data.message, "RESPONSE")
  if (res.data?.responseCode === responseCode.Success) {
    message.success('Requisition Created');
    return res;
  } else {
    message.error(res.data.message);
    return rejectWithValue(res.data.message);
  }
});

// export const cancelReward = createAsyncThunk("reward/cancelReward", async (id, { dispatch, setState }) => {
//   const response = await cancelRewardService(id);
//   return response;
// });
