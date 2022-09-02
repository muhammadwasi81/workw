import { createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";
import { responseCode } from "../../../../services/enums/responseCode";
import { responseMessage, responseMessageType } from "../../../../services/slices/notificationSlice";
import { getAllCustomApprovalService, GetCustomApprovalByIdService, addCustomApprovalService } from "../services/service";

export const getAllCustomApprovals = createAsyncThunk("CustomApproval/GetAllCustomApprovals", async (data) => {
  const response = await getAllCustomApprovalService(data);
  if (!response.responseCode) {
    message.error("Something went wrong");
  }
  return response.data;
});

export const addCustomApproval = createAsyncThunk("customApproval/addcustomApproval", async (data, { dispatch, getState, rejectWithValue }) => {
  const res = await addCustomApprovalService(data);
  if (res.data?.responseCode === responseCode.Success) {
    message.success('Custom Approval Created');
    return res;
  } else {
    message.error(res.data.message);
    return rejectWithValue(res.data.message);
  }
});

export const GetCustomApprovalById = createAsyncThunk("CustomApproval/GetCustomApprovalById", async (id) => {
  const response = await GetCustomApprovalByIdService(id);
  console.log("MY ID", id);
  return response.data;
});
