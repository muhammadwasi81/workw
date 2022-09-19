import { createAsyncThunk } from "@reduxjs/toolkit";
import { responseCode } from "../../../../services/enums/responseCode";
import {
  responseMessage,
  responseMessageType,
} from "../../../../services/slices/notificationSlice";

import { getAllEducationService } from "../service/service";
export const getEducationDetailByUser = createAsyncThunk(
  "educationDetails",
  async (id, { dispatch, getState, rejectWithValue }) => {
    const res = await getAllEducationService(id);
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
