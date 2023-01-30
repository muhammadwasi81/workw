import { createAsyncThunk } from "@reduxjs/toolkit";
import { setUser } from "../../../../store/appReducer/userSlice";
import { loginService, setNewPasswordService, signupService } from "../services/service";
import { emailVerificationService } from "../services/service";
import { responseCode } from "../../../../services/enums/responseCode";
import { message } from "antd";
import { STRINGS } from "../../../../utils/base";
import { getDefaultDesignationService } from "../../../../utils/Shared/services/services";
import { addDeviceService } from "../../calling/services/services";
import { getFirebaseToken } from "../../../../firebase/initFirebase";

const addFcmDeviceOnServer = async (data) => {
	const payload = {
		"userId": data.user.id,
		"deviceType": 1,
		"deviceToken": data.deviceToken,
		"osVersion": "1.0.0",
		"device": "Web"
	}
	const response = await addDeviceService(payload);
	if (response.responseCode === responseCode.Success)
		return response.data;
	else
		message.error(response.message);
}

export const loginUser = createAsyncThunk(
	"auth/login",
	async (userData, { dispatch, getState }) => {
		const res = await loginService(userData);
		if (res.data) {
			const { data } = res;
			if (data.responseCode !== responseCode.Success)
				message.error(data.message);
			if (res) {
				// save device token on server for Fcm Notifications...
				await dispatch(
					setUser({
						user: data.data,
						token: data.data.accessToken,
						refreshToken: data.data.refreshToken,
					})
				);
				if (userData.deviceToken) {
					const addDeviceRes = await addFcmDeviceOnServer({ user: data.data, deviceToken: userData.deviceToken });
					if(addDeviceRes){
						dispatch(
							setUser({
								user: data.data,
								token: data.data.accessToken,
								refreshToken: data.data.refreshToken,
								deviceToken: addDeviceRes.deviceToken
							})
						)
					}
				}
				document.cookie = `token=${data.data.accessToken}; domain=.workw.com; path=/;`;
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

export const signup = createAsyncThunk(
	"auth/signup",
	async (formData, { }) => {
		const res = await signupService(formData);

		if (res.data) {
			const { data } = res;

			if (data.responseCode === 1001) {
				window.location.pathname = "/verification";
				return data;
			} else {
				message.error(data.message);
			}
		} else {
			alert("Something went wrong");
		}

		return res;
	}
);

export const verification = createAsyncThunk(
	"auth/signup/verification",
	async (token, { rejectWithValue }) => {
		try {
			const response = await emailVerificationService(token);
			return response.data;
		} catch (e) {
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
				if (permission === 'granted') {
				let firebaseToken = await getFirebaseToken();
				// set send token api here...
				deviceToken = firebaseToken;
				console.log(firebaseToken, 'firebaseToken');
				}
				dispatch(loginUser({ 
					...{
						email: response.data.data,
						password: data.password
					}, 
					deviceToken }));
				return response.data;	
			} else {
				message.error(response.data.message)
			}
		} catch (e) {
			return rejectWithValue(e.response.data);
		}
	}
);
