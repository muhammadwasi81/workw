import { createAsyncThunk } from "@reduxjs/toolkit";
import { responseCode } from "../../../../services/enums/responseCode";
import { openNotification } from "../../../../utils/Shared/store/slice";
import {
	addScheduleService,
	getAllScheduleService,
} from "../services/services";

export const addSchedule = createAsyncThunk(
	"addSchedule",
	async (data, { dispatch, getState, rejectWithValue }) => {
		const res = await addScheduleService(data);
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

export const getAllSchedule = createAsyncThunk(
	"getAllSchedule",
	async (data, { dispatch, getState, rejectWithValue }) => {
		const res = await getAllScheduleService(data);
		if (res.responseCode === responseCode.Success) {
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

export const getAllEventSchedule = createAsyncThunk(
	"getAllEventSchedule",
	async (data, { dispatch, getState, rejectWithValue }) => {
		const res = await getAllScheduleService(data);
		if (res.responseCode === responseCode.Success) {
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

export const getAllCurrentSchedule = createAsyncThunk(
	"getAllCurrentSchedule",
	async (data, { dispatch, getState, rejectWithValue }) => {
		const res = await getAllScheduleService(data);
		if (res.responseCode === responseCode.Success) {
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

export const getAllUpcomingSchedule = createAsyncThunk(
	"getAllUpcomingSchedule",
	async (data, { dispatch, getState, rejectWithValue }) => {
		const res = await getAllScheduleService(data);
		if (res.responseCode === responseCode.Success) {
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
