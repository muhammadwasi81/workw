import { createAsyncThunk } from "@reduxjs/toolkit";
import { responseCode } from "../../../../services/enums/responseCode";
import {
	responseMessage,
	responseMessageType,
} from "../../../../services/slices/notificationSlice";
import { openNotification } from "../../../../utils/Shared/store/slice";

import {
	addWorkboardService,
	getAllWorkboardService,
	getWorkboardByIdService,
} from "../services/services";

export const addWorkBoard = createAsyncThunk(
	"addWorkBoard",
	async (data, { dispatch, getState, rejectWithValue }) => {
		const res = await addWorkboardService(data);
		if (res.responseCode === responseCode.Success) {
			dispatch(
				openNotification({
					message: "WorkBoard Created Successfully",
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

export const getAllWorkBoard = createAsyncThunk(
	"getAllWorkBoard",
	async (data, { dispatch, getState, rejectWithValue }) => {
		const res = await getAllWorkboardService(data);
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
			// responseMessage({
			// 	dispatch: dispatch,
			// 	data: res,
			// 	type: responseMessageType.ApiFailure,
			// });
			return rejectWithValue(res.message);
		}
	}
);

export const getWorkboardById = createAsyncThunk(
	"getWorkboardById",
	async (id, { dispatch, getState, rejectWithValue }) => {
		const res = await getWorkboardByIdService(id);
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
