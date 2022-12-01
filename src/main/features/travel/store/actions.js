import { createAsyncThunk } from "@reduxjs/toolkit";
import { responseCode } from "../../../../services/enums/responseCode";
import { openNotification } from "../../../../utils/Shared/store/slice";
import {
	responseMessage,
	responseMessageType,
} from "../../../../services/slices/notificationSlice";

import {
	addTravelService,
	getAllTravelService,
	getTravelByIdService,
} from "../services/service";

export const addTravel = createAsyncThunk(
	"addTravel",
	async (data, { dispatch, getState, rejectWithValue }) => {
		const res = await addTravelService(data);
		if (res.responseCode === responseCode.Success) {
			// console.log("success");
			dispatch(
				openNotification({
					message: "Travel Created Successfully",
					type: "success",
					duration: 2,
				})
			);
			return res;
		} else {
			// console.log("error");
			dispatch(
				openNotification({
					message: res.message,
					type: "error",
					duration: 2,
				})
			);
			return rejectWithValue(res.message);
		}
		// console.log("response after sending", res);
		// return res;
	}
);
export const getAllTravel = createAsyncThunk(
	"getAllTravel",
	async (data, { dispatch, getState, rejectWithValue }) => {
		const res = await getAllTravelService(data);
		if (res.responseCode === responseCode.Success) {
			// console.log("success");
			// responseMessage({
			// 	dispatch: dispatch,
			// 	data: res,
			// 	type: responseMessageType.ApiSuccess,
			// });
			return res;
		} else {
			// console.log("error");
			responseMessage({
				dispatch: dispatch,
				data: res,
				type: responseMessageType.ApiFailure,
			});
			return rejectWithValue(res.message);
		}
		// console.log("response after sending", res);
		// return res;
	}
);
export const getTravelById = createAsyncThunk(
	"getTravelById",
	async (id, { dispatch, getState, rejectWithValue }) => {
		const res = await getTravelByIdService(id);
		if (res.responseCode === responseCode.Success) {
			responseMessage({
				dispatch: dispatch,
				data: res,
				type: responseMessageType.ApiSuccess,
			});
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
