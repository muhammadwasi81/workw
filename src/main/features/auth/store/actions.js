import { createAsyncThunk } from "@reduxjs/toolkit";
import { setUser } from "../../../../store/appReducer/userSlice";
import { loginService, signupService } from "../services/service";
// import { uploadImageService } from "../services/service";
// import { getDesignationService } from "../services/service";
import { emailVerificationService } from "../services/service";
import { responseCode } from "../../../../services/enums/responseCode";
import { message } from "antd";
// import { responseMessageType } from "../../../../services/slices/notificationSlice";
// import { responseMessage } from "../../../../services/slices/notificationSlice";
import { STRINGS } from "../../../../utils/base";
import { getDefaultDesignationService } from "../../../../utils/Shared/services/services";

export const loginUser = createAsyncThunk(
	"auth/login",
	async (userData, { dispatch, getState }) => {
		const res = await loginService(userData);
		// console.log(res.data, "Ressss");
		if (res.data) {
			const { data } = res;

			if (data.responseCode !== responseCode.Success)
				message.error(data.message);

			if (res) {
				dispatch(
					setUser({
						user: data.data,
						token: data.data.accessToken,
						refreshToken: data.data.refreshToken,
					})
				);
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
	async (formData, { getState }) => {
		const res = await signupService(formData);

		if (res.data) {
			const { data } = res;

			if (data.responseCode === 1001) {
				window.location.pathname = "/verify";
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
		console.log("THUNK", token);

		try {
			const response = await emailVerificationService(token);
			console.log(response, "FROM THUNK");
			return response.data;
		} catch (e) {
			return rejectWithValue(e.response.data);
		}
	}
);
