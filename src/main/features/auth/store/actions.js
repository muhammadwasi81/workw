import { createAsyncThunk } from "@reduxjs/toolkit";
import { setUser } from "../../../../store/appReducer/userSlice";
import {
  loginService,
  setNewPasswordService,
  signupService,
  forgotPasswordTokenService,
} from "../services/service";
import { emailVerificationService, forgotPassword } from "../services/service";
import { responseCode } from "../../../../services/enums/responseCode";
import { message } from "antd";
import { STRINGS } from "../../../../utils/base";
import { getDefaultDesignationService } from "../../../../utils/Shared/services/services";
import { addDeviceService } from "../../calling/services/services";
import { getFirebaseToken } from "../../../../firebase/initFirebase";
import { ValidateFunction } from "./functions/validate";

const addFcmDeviceOnServer = async (data) => {
  const payload = {
    userId: data.user.id,
    deviceType: 1,
    deviceToken: data.deviceToken,
    osVersion: "1.0.0",
    device: "Web",
  };
  const response = await addDeviceService(payload);
  if (response.responseCode === responseCode.Success) return response.data;
  else message.error(response.message);
};

export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData, { dispatch, getState }) => {
    let payload = {
      email: userData.email,
      password: userData.password,
    };
    const res = await loginService(payload);
    if (res.data) {
      const { data } = res;
      if (data.responseCode === responseCode.Success) {
        // save device token on server for Fcm Notifications...
        await dispatch(
          setUser({
            user: data.data,
            token: data.data.accessToken,
            refreshToken: data.data.refreshToken,
          })
        );
        if (userData.deviceToken) {
          const addDeviceRes = await addFcmDeviceOnServer({
            user: data.data,
            deviceToken: userData.deviceToken,
          });
          if (addDeviceRes) {
            dispatch(
              setUser({
                user: data.data,
                token: data.data.accessToken,
                refreshToken: data.data.refreshToken,
                deviceToken: addDeviceRes.deviceToken,
              })
            );
          }
        }
        document.cookie = `token=${data.data.accessToken}; domain=.workw.com; path=/;`;
      } else {
        message.error(data.message);
      }
    } else {
      message.error(STRINGS.SERVER_ERROR);
    }
    return res;
  }
);

export const getDesignation = createAsyncThunk(
  "Utility/GetAllDefaultDesignation",
  async (_, thunkAPI) => {
    const response = await getDefaultDesignationService();
    return response.data;
  }
);

// export const uploadImage = createAsyncThunk(
// 	"Upload/UploadFiles",
// 	async (data, thunkAPI) => {
// 		const response = await uploadImageService(data);
// 		return response.data;
// 	}
// );

function redirectToLogin() {
  window.location.pathname = "/login";
}

export const signup = createAsyncThunk("auth/signup", async (formData, {}) => {
  const res = await signupService(formData);

  if (res.data) {
    const { data } = res;

    if (data.responseCode === 1001) {
      message.success(
        "Thank you for signing up with Workwise please check confirmation email"
      );
      setTimeout(redirectToLogin, 4000);
      return data;
    } else {
      message.error(data.message);
    }
  } else {
    alert("Something went wrong");
  }

  return res;
});

export const verification = createAsyncThunk(
  "auth/signup/verification",
  async (token, { rejectWithValue }) => {
    try {
      const response = await emailVerificationService(token);
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

export const forgotPasswordVerification = createAsyncThunk(
  "auth/forgot/password",
  async (data, { rejectWithValue, dispatch }) => {
    console.log(data, "dataaa");
    try {
      const response = await forgotPassword(data);
      if (response.data.responseCode === 1001) {
        message.success("Thanks for your Time");
      } else {
        message.error("Email Required");
      }
      return response.data;
    } catch (e) {
      message.error("Someting went wrong");
      return rejectWithValue(e.response.data);
    }
  }
);

// export const forgotPasswordToken = createAsyncThunk(
//   "auth/forgot/passwordtoken",
//   async (data, { rejectWithValue }) => {
//     console.log(data, "dataaa");
//     try {
//       const response = await forgotPasswordTokenService(data);
//       return response.data;
//     } catch (e) {
//       message.error("Someting went wrong");
//       return rejectWithValue(e.response.data);
//     }
//   }
// );
