import { createAsyncThunk } from "@reduxjs/toolkit";
import { responseCode } from "../../../../services/enums/responseCode";
import {
  responseMessage,
  responseMessageType,
} from "../../../../services/slices/notificationSlice";
import { ResponseType } from "../../../../utils/api/ResponseResult";
import { openNotification } from "../../../../utils/Shared/store/slice";
import {
  getUserEmergencyService,
  updateUserEmployeeContactService,
  addUserEmergenctContactService,
} from "../service/service";

export const getUserEmergency = createAsyncThunk(
  "emergencyInfo/emergencyDetails",
  async (id, { dispatch, rejectWithValue }) => {
    const res = await getUserEmergencyService(id);
    console.log(res, "getUserEmergency action");
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

export const updateUserEmergencyContactAction = createAsyncThunk(
  "emergencyInfo/updateUserEmergencyContact",
  async (payload, { rejectWithValue, dispatch }) => {
    const response = await updateUserEmployeeContactService(payload);
    console.log(response, "updateUserEmergencyContactAction");
    switch (response.type) {
      case ResponseType.ERROR:
        return rejectWithValue(response.errorMessage);
      case ResponseType.SUCCESS:
        dispatch(
          openNotification({
            message: "Emergency Contact Updated Successfully",
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

export const addUserEmergencyContactAction = createAsyncThunk(
  "emergencyInfo/addUserEmergencyContact",
  async (payload, { rejectWithValue, dispatch }) => {
    console.log(payload, "sssa");
    const response = await addUserEmergenctContactService(payload);
    console.log(response, "addUser emeergency contact action");
    switch (response.type) {
      case ResponseType.ERROR:
        return rejectWithValue(response.errorMessage);
      case ResponseType.SUCCESS:
        dispatch(
          openNotification({
            message: `Emergency contact added Successfully`,
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
