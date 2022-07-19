import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import { responseCode } from "../../../../services/enums/responseCode";
import {
	responseMessage,
	responseMessageType,
} from "../../../../services/slices/notificationSlice";
import {
	addBusinessPolicyService,
	removeBusinessPolicyService,
	getAllBusinessPolicyService,
} from "../services/service";
import { businessDeleted } from "./slice";

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


export const removeBusinessPolicy = createAsyncThunk(
	"removeBusinessPolicy",
	async (args, { dispatch, rejectWithValue }) => {
		const res = await removeBusinessPolicyService(args);

		if (res.responseCode === responseCode.Success) {
			dispatch(businessDeleted(args))
			console.log(args, "FROM ACTIONSSS")
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