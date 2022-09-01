import { createAsyncThunk } from "@reduxjs/toolkit";
import { responseCode } from "../../../../services/enums/responseCode";
import {
  responseMessage,
  responseMessageType,
} from "../../../../services/slices/notificationSlice";
import { getUserBasicInfoByIdService } from "../service/service";

export const getUserBasicInfo = createAsyncThunk(
  "basicInfo",
  async (id, { dispatch, getState, rejectWithValue }) => {
    const res = await getUserBasicInfoByIdService(id);
    if (res.responseCode === responseCode.Success) {
      return res;
    } else {
      responseMessage({
        dispatch: dispatch,
        data: res,
        type: responseMessageType.ApiFailure,
      });
      return rejectWithValue(res.message);
    }
  }
);
