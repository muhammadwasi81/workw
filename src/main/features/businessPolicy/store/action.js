import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import { responseCode } from "../../../../services/enums/responseCode";
import {
	responseMessage,
	responseMessageType,
} from "../../../../services/slices/notificationSlice";
import {
	addBusinessPolicyService,
	getAccessRoleByIdService,
	getAllBusinessPolicyService,
} from "../services/service";

export const addBusinessPolicy = createAsyncThunk(
	"addBusiness",
	async (data, { dispatch, getState, rejectWithValue }) => {
		const res = await addBusinessPolicyService(data);

		console.log(res, "HELLOOO RESPONSE")

		if (res.responseCode === responseCode.Success) {
			// res.message = "Access Role added successfully!";
			// responseMessage({ dispatch, data: res });
			return res;
		} else {
			responseMessage({
				dispatch: dispatch,
				type: responseMessageType.ApiFailure,
			});
			return rejectWithValue("Something went wrong");
		}
	}
);

export const getAllBusinessPolicy = createAsyncThunk(
	"getAllBusinessPolicy",
	async (data, { dispatch, getState }) => {
		const res = await getAllBusinessPolicyService();
		if (!res.responseCode) {
			responseMessage({
				dispatch: dispatch,
				type: responseMessageType.ApiFailure,
			});
		}
		// console.log("response after getting access role", res);
		return res;
	}
);
