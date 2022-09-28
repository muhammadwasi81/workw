import { createAsyncThunk } from "@reduxjs/toolkit";
import { responseCode } from "../../../../services/enums/responseCode";
import {
	responseMessage,
	responseMessageType,
} from "../../../../services/slices/notificationSlice";
import { openNotification } from "../../../../utils/Shared/store/slice";
import {
	addLeadManagerContactService,
	addLeadManagerDetailService,
	addLeadManagerService,
	getAllLeadManagerPagingService,
	getAllLeadManagerService,
	getLeadManagerByIdService,
	getLeadManagerContactDetailService,
	getLeadManagerSectionByIdService,
	getLeadManagerSectionDetailByIdService,
	moveLeadManagerDetailService,
	moveLeadManagerSectionService,
	updateLeadManagerContactService,
	updateLeadManagerDetailService,
	updateLeadManagerService,
} from "../services/services";

export const addLeadManager = createAsyncThunk(
	"addLeadManager",
	async (data, { dispatch, getState, rejectWithValue }) => {
		const res = await addLeadManagerService(data);
		if (res.responseCode === responseCode.Success) {
			dispatch(
				openNotification({
					message: "LeadManager Created Successfully",
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

export const addLeadManagerDetail = createAsyncThunk(
	"addLeadManagerDetail",
	async (data, { dispatch, getState, rejectWithValue }) => {
		const res = await addLeadManagerDetailService(data);
		if (res.responseCode === responseCode.Success) {
			dispatch(
				openNotification({
					message: "Lead Manager Detail Created Successfully",
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

export const updateLeadManager = createAsyncThunk(
	"updateLeadManager",
	async (data, { dispatch, getState, rejectWithValue }) => {
		const res = await updateLeadManagerService(data);
		if (res.responseCode === responseCode.Success) {
			dispatch(
				openNotification({
					message: "Lead Manager Updated Successfully!",
					type: "success",
					duration: 2,
				})
			);
			// dispatch(
			// 	getAllLeadManager({
			// 		pageNo: 0,
			// 		pageSize: 0,
			// 		search: "",
			// 	})
			// );
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

export const getAllLeadManager = createAsyncThunk(
	"getAllLeadManager",
	async (data, { dispatch, getState, rejectWithValue }) => {
		const res = await getAllLeadManagerService(data);
		if (res.responseCode === responseCode.Success) {
			return res;
		} else {
			return rejectWithValue(res.message);
		}
	}
);

export const getAllLeadManagerPaging = createAsyncThunk(
	"getAllLeadManagerPaging",
	async (data, { dispatch, getState, rejectWithValue }) => {
		const res = await getAllLeadManagerPagingService(data);
		if (res.responseCode === responseCode.Success) {
			return res;
		} else {
			return rejectWithValue(res.message);
		}
	}
);

export const getLeadManagerById = createAsyncThunk(
	"getLeadManagerById",
	async (id, { dispatch, getState, rejectWithValue }) => {
		const res = await getLeadManagerByIdService(id);
		if (res.responseCode === responseCode.Success) {
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

export const getLeadManagerSectionById = createAsyncThunk(
	"getLeadManagerSectionById",
	async (id, { dispatch, getState, rejectWithValue }) => {
		const res = await getLeadManagerSectionByIdService(id);
		if (res.responseCode === responseCode.Success) {
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

export const getLeadManagerDetailById = createAsyncThunk(
	"getLeadManagerDetailById",
	async (id, { dispatch, getState, rejectWithValue }) => {
		const res = await getLeadManagerSectionDetailByIdService(id);
		if (res.responseCode === responseCode.Success) {
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

export const addLeadManagerContact = createAsyncThunk(
	"addLeadManagerContact",
	async (data, { dispatch, getState, rejectWithValue }) => {
		const res = await addLeadManagerContactService(data);
		if (res.responseCode === responseCode.Success) {
			dispatch(
				openNotification({
					message: "LeadManager Contact Created Successfully",
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

export const updateLeadManagerDetail = createAsyncThunk(
	"updateLeadManagerDetail",
	async (data, { dispatch, getState, rejectWithValue }) => {
		const res = await updateLeadManagerDetailService(data);
		if (res.responseCode === responseCode.Success) {
			dispatch(
				openNotification({
					message: "Lead Manager Detail Updated Successfully!",
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

export const getAllLeadManagerContactDetail = createAsyncThunk(
	"getAllLeadManagerContactDetail",
	async (id, { dispatch, getState, rejectWithValue }) => {
		const res = await getLeadManagerContactDetailService(id);
		if (res.responseCode === responseCode.Success) {
			return res;
		} else {
			return rejectWithValue(res.message);
		}
	}
);

export const updateLeadManagerContact = createAsyncThunk(
	"updateLeadManagerContact",
	async (data, { dispatch, getState, rejectWithValue }) => {
		const res = await updateLeadManagerContactService(data);
		if (res.responseCode === responseCode.Success) {
			dispatch(
				openNotification({
					message: "Lead Manager Contact Updated Successfully!",
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

export const moveLeadManagerSection = createAsyncThunk(
	"moveLeadManagerSection",
	async (data, { dispatch, getState, rejectWithValue }) => {
		const res = await moveLeadManagerSectionService(data);
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

export const moveLeadManagerDetail = createAsyncThunk(
	"moveLeadManagerDetail",
	async (data, { dispatch, getState, rejectWithValue }) => {
		const res = await moveLeadManagerDetailService(data);
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

// export const deleteLeadManagerContact = createAsyncThunk(
// 	"deleteLeadManagerContact",
// 	async (id, { dispatch, getState, rejectWithValue }) => {
// 		const res = await deleteLeadManagerContactService(id);
// 		if (res.responseCode === responseCode.Success) {
// 			dispatch(
// 				openNotification({
// 					message: "Lead Manager Contact Deleted Successfully!",
// 					type: "success",
// 					duration: 2,
// 				})
// 			);

// 			return res;
// 		} else {
// 			return rejectWithValue(res.message);
// 		}
// 	}
// );
