import { createAsyncThunk } from "@reduxjs/toolkit";
import { responseCode } from "../../../../services/enums/responseCode";
import {
  responseMessage,
  responseMessageType,
} from "../../../../services/slices/notificationSlice";

import { getBankDetailsByUserService } from "../service/service";
export const getBankDetailByUser = createAsyncThunk(
  "bankDetail",
  async (id, { dispatch, getState, rejectWithValue }) => {
    const res = await getBankDetailsByUserService(id);
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
