import { createAsyncThunk } from "@reduxjs/toolkit";
import { responseCode } from "../../../../services/enums/responseCode";
import {
  responseMessage,
  responseMessageType,
} from "../../../../services/slices/notificationSlice";
import { ResponseType } from "../../../../utils/api/ResponseResult";
import { openNotification } from "../../../../utils/Shared/store/slice";

import {
  getUserWorkExperienceService,
  updateUserWorkExperienceService,
  addUserWorkExperienceService,
} from "../service/service";

export const getUserWorkExperience = createAsyncThunk(
  "experienceDetails/getUserWorkExperience",
  async (id, { dispatch, rejectWithValue }) => {
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

export const updateUserWorkExperienceAction = createAsyncThunk(
  "experienceDetails/updateUserWorkExperience",
  async (payload, { rejectWithValue, dispatch }) => {
    const response = await updateUserWorkExperienceService(payload);
    console.log(response, "updateUserWorkExperienceAction action");
    switch (response.type) {
      case ResponseType.ERROR:
        return rejectWithValue(response.errorMessage);
      case ResponseType.SUCCESS:
        dispatch(
          openNotification({
            message: "Work Experience Updated Successfully",
            type: "success",
            duration: 2,
          })
        );
        return response.data;
      default:
        return;
    }
  }
);

export const addUserWorkExperienceAction = createAsyncThunk(
  "experienceDetails/addUserWorkExperience",
  async (payload, { rejectWithValue, dispatch }) => {
    console.log(payload, "sssa");
    const response = await addUserWorkExperienceService(payload);
    console.log(response, "addUserWorkExperienceService contact action");
    switch (response.type) {
      case ResponseType.ERROR:
        return rejectWithValue(response.errorMessage);
      case ResponseType.SUCCESS:
        dispatch(
          openNotification({
            message: `Work experience added Successfully`,
            type: "success",
            duration: 2,
          })
        );
        return response.data;
      default:
        return;
    }
  }
);
