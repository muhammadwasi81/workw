import { createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";
import { responseCode } from "../../../../services/enums/responseCode";
import { responseMessage, responseMessageType } from "../../../../services/slices/notificationSlice";
import { getAllCustomApprovalService, GetCustomApprovalByIdService } from "../services/service";

export const getAllCustomApprovals = createAsyncThunk("CustomApproval/GetAllCustomApprovals", async (data) => {
  const response = await getAllCustomApprovalService(data);
  if (!response.responseCode) {
    message.error("Something went wrong");
  }
  return response.data;
});

export const GetCustomApprovalById = createAsyncThunk("CustomApproval/GetCustomApprovalById", async (id) => {
  const response = await GetCustomApprovalByIdService(id);
  console.log("MY ID", id);
  return response.data;
});
