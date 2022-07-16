import { createAsyncThunk } from "@reduxjs/toolkit";
import { responseCode } from "../../../../services/enums/responseCode";
import {
	responseMessage,
	responseMessageType,
} from "../../../../services/slices/notificationSlice";
import { openNotification } from "../../../../utils/Shared/store/slice";

import {
	addWorkBoardSectionService,
	addWorkboardService,
	getAllWorkboardService,
	getWorkboardByIdService,
	updateWorkboardService,
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
			dispatch(
				getAllWorkBoard({
					pageNo: 0,
					pageSize: 0,
					search: "",
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

export const updateWorkBoard = createAsyncThunk(
	"updateWorkBoard",
	async (data, { dispatch, getState, rejectWithValue }) => {
		const res = await updateWorkboardService(data);
		if (res.responseCode === responseCode.Success) {
			dispatch(
				openNotification({
					message: "WorkBoard Updated Successfully!",
					type: "success",
					duration: 2,
				})
			);
			dispatch(
				getAllWorkBoard({
					pageNo: 0,
					pageSize: 0,
					search: "",
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
			return res;
		} else {
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

export const addWorkBoardSection = createAsyncThunk(
	"addWorkBoardSection",
	async (data, { dispatch, getState, rejectWithValue }) => {
		const res = await addWorkBoardSectionService(data);
		if (res.responseCode === responseCode.Success) {
			dispatch(
				getAllWorkBoard({
					pageNo: 0,
					pageSize: 0,
					search: "",
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
