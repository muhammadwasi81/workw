import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  GetReferenceByIdService,
  addScheduleByExternalService,
  projectExternalService,
  setNewPasswordService,
} from "../services/service";
import { openNotification } from "../../../../../utils/Shared/store/slice";
import { responseCode } from "../../../../../services/enums/responseCode";
import { ValidateFunction } from "./functions/validate";
import { getFirebaseToken } from "../../../../../firebase/initFirebase";
import { loginUser } from "../../../auth/store/actions";
import { message } from "antd";

export const GetReferenceById = createAsyncThunk("referenceId", async (id) => {
  try {
    const response = await GetReferenceByIdService(id);
    console.log(response.data, "action data");
    return response.data;
  } catch (error) {
    console.log(error.message);
    throw new Error(`Error Fething Data: ${error}`, { cause: error });
  }
});

export const addAppointmentByExternal = createAsyncThunk(
  "addSchedule",
  async (data, { dispatch, getState, rejectWithValue }) => {
    const res = await addScheduleByExternalService(data);
    if (res.responseCode === responseCode.Success) {
      dispatch(
        openNotification({
          message: "Schedule Created Successfully",
          type: "success",
          duration: 2,
        })
      );
      return res;
    } else {
      dispatch(
        openNotification({
          message: res.message,
          type: "error",
          duration: 2,
        })
      );
      return rejectWithValue(res.message);
    }
  }
);

export const getVerifyProjectExternalMember = createAsyncThunk(
  "getVerifyProjectExternalMember",
  async (token, { rejectWithValue }) => {
    try {
      const response = await projectExternalService(token);
      ValidateFunction(response.data.responseCode, response.data.message);
      return response.data;
    } catch (e) {
      message.error("Someting went wrong");
      return rejectWithValue(e.response.data);
    }
  }
);

export const setNewPassword = createAsyncThunk(
  "auth/signup/SetNewPassword",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const response = await setNewPasswordService(data);
      if (response.data.responseCode === 1001) {
        let permission = await Notification.requestPermission();
        let deviceToken = null;
        if (permission === "granted") {
          let firebaseToken = await getFirebaseToken();
          // set send token api here...
          deviceToken = firebaseToken;
        }

        dispatch(
          loginUser({
            ...{
              email: response.data.data,
              password: data.password,
            },
            deviceToken,
          })
        );
        return response.data;
      } else {
        message.error(response.data.message);
      }
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);
