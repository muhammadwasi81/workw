import { createAsyncThunk } from "@reduxjs/toolkit";
import { ResponseType } from "../../../../utils/api/ResponseResult";
import { getAllApprovalService } from "../services/service";

export const getAllApproval = createAsyncThunk(
  "Approval/getAllApproval",
  async (payload={}, { rejectWithValue, dispatch }) => {
    const response = await getAllApprovalService(payload);
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