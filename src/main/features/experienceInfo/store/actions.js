import { createAsyncThunk } from "@reduxjs/toolkit";
import { responseCode } from "../../../../services/enums/responseCode";
import {
  responseMessage,
  responseMessageType,
} from "../../../../services/slices/notificationSlice";

import { getUserWorkExperienceService } from "../service/service";
export const getUserWorkExperience = createAsyncThunk(
  "experienceDetails",
  async (id, { dispatch, getState, rejectWithValue }) => {
    const res = await getUserWorkExperienceService(id);
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
