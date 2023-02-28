import { createAsyncThunk } from "@reduxjs/toolkit";
import { ResponseType } from "../../../../../utils/api/ResponseResult";
import { jsonToFormData, STRINGS } from "../../../../../utils/base";
import { openNotification } from "../../../../../utils/Shared/store/slice";
import {
  projectExternalService,
  setNewPasswordService,
} from "../services/service";
import { ValidateFunction } from "./functions/validate";
import { getFirebaseToken } from "../../../../../firebase/initFirebase";
import { loginUser } from "../../../auth/store/actions";
import { message } from "antd";

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
          console.log(firebaseToken, "firebaseToken");
        }
        return;
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
