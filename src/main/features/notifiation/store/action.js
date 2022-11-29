import { createAsyncThunk } from "@reduxjs/toolkit";
import { ResponseType } from "../../../../utils/api/ResponseResult";
import { openNotification } from "../../../../utils/Shared/store/slice";
import { getAllNotificationService } from "../services/service";

export const getAllNotification = createAsyncThunk(
  "Notification/getAllNotification",
  async (payload={}, { rejectWithValue, dispatch }) => {
    const response = await getAllNotificationService(payload);
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