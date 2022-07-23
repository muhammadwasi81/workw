import { createAsyncThunk } from "@reduxjs/toolkit";
import { responseCode } from "../../../../services/enums/responseCode";
import {
	responseMessage,
	responseMessageType,
} from "../../../../services/slices/notificationSlice";
import { openNotification } from "../../../../utils/Shared/store/slice";

import {
	addWorkBoardSectionService,
	addWorkBoardSectionTodoService,
	addWorkboardService,
	getAllWorkboardService,
	getWorkboardByIdService,
	getWorkboardTodoByIdService,
	moveWorkBoardSectionService,
	moveWorkBoardSectionTodoService,
	removeWorkBoardTodoImageService,
	removeWorkBoardTodoService,
	updateWorkBoardSectionColorCodeService,
	updateWorkBoardSectionTitleService,
	updateWorkboardService,
	updateWorkBoardTodoDescService,
	updateWorkBoardTodoDueDateService,
	updateWorkBoardTodoTitleService,
	uploadWorkBoardTodoImageService,
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
			// console.log("res", res);
			dispatch(getWorkboardById(res.data.workBoardId));
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

export const updateWorkBoardSectionColorCode = createAsyncThunk(
	"updateWorkBoardSectionColorCode",
	async (data, { dispatch, getState, rejectWithValue }) => {
		const res = await updateWorkBoardSectionColorCodeService(data);
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

export const updateWorkBoardSectionTitle = createAsyncThunk(
	"updateWorkBoardSectionTitle",
	async (data, { dispatch, getState, rejectWithValue }) => {
		const res = await updateWorkBoardSectionTitleService(data);
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

export const moveWorkBoardSection = createAsyncThunk(
	"moveWorkBoardSection",
	async (data, { dispatch, getState, rejectWithValue }) => {
		const res = await moveWorkBoardSectionService(data);
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

export const moveWorkBoardTodo = createAsyncThunk(
	"moveWorkBoardTodo",
	async (data, { dispatch, getState, rejectWithValue }) => {
		const res = await moveWorkBoardSectionTodoService(data);
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

export const addWorkBoardSectionTodo = createAsyncThunk(
	"addWorkBoardSectionTodo",
	async (data, { dispatch, getState, rejectWithValue }) => {
		const res = await addWorkBoardSectionTodoService(data);
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

export const getWorkBoardTodoById = createAsyncThunk(
	"getWorkBoardTodoById",
	async (id, { dispatch, getState, rejectWithValue }) => {
		const res = await getWorkboardTodoByIdService(id);
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

export const updateWorkBoardTodoDesc = createAsyncThunk(
	"updateWorkBoardTodoDesc",
	async (data, { dispatch, getState, rejectWithValue }) => {
		const res = await updateWorkBoardTodoDescService(data);
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

export const updateWorkBoardTodoTitle = createAsyncThunk(
	"updateWorkBoardTodoTitle",
	async (data, { dispatch, getState, rejectWithValue }) => {
		const res = await updateWorkBoardTodoTitleService(data);
		if (res.responseCode === responseCode.Success) {
			return { data: res.data, sectionId: data.sectionId };
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

export const updateWorkBoardTodoImage = createAsyncThunk(
	"updateWorkBoardTodoImage",
	async (data, { dispatch, getState, rejectWithValue }) => {
		const res = await uploadWorkBoardTodoImageService(data);
		if (res.responseCode === responseCode.Success) {
			return {
				data: res.data,
				id: data.get("todoId"),
				sectionId: data.get("sectionId"),
			};
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

export const updateWorkBoardTodoDueDate = createAsyncThunk(
	"updateWorkBoardTodoDueDate",
	async (data, { dispatch, getState, rejectWithValue }) => {
		const res = await updateWorkBoardTodoDueDateService(data);
		if (res.responseCode === responseCode.Success) {
			return { data: res.data, sectionId: data.sectionId };
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

export const removeWorkBoardTodoImage = createAsyncThunk(
	"removeWorkBoardTodoImage",
	async (data, { dispatch, getState, rejectWithValue }) => {
		const res = await removeWorkBoardTodoImageService(data);
		if (res.responseCode === responseCode.Success) {
			return { id: data.id, sectionId: data.sectionId };
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

export const removeWorkBoardTodo = createAsyncThunk(
	"removeWorkBoardTodo",
	async (data, { dispatch, getState, rejectWithValue }) => {
		const res = await removeWorkBoardTodoService(data);
		if (res.responseCode === responseCode.Success) {
			return { id: data.id, sectionId: data.sectionId };
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
