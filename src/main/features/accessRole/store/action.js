import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import { responseCode } from "../../../../services/enums/responseCode";
import {
	responseMessage,
	responseMessageType,
} from "../../../../services/slices/notificationSlice";
import {
	addAccessRoleService,
	getAccessRoleByIdService,
	getAllAccessRolesService,
	updateAccessRoleByIdService,
} from "../services/service";

export const addAccessRole = createAsyncThunk(
	"addAccessRole",
	async (data, { dispatch, getState, rejectWithValue }) => {
		const res = await addAccessRoleService(data);
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

export const getAllAccessRoles = createAsyncThunk(
	"getAllAccessRoles",
	async (data, { dispatch, getState }) => {
		const res = await getAllAccessRolesService();
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

export const getAccessRoleById = createAsyncThunk(
	"getAccessRoleById",
	async (data, { dispatch, getState }) => {
		const res = await getAccessRoleByIdService(data);
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

export const updateAccessRoleById = createAsyncThunk(
	"updateAccessRoleById",
	async (data, { dispatch, getState }) => {
		const res = await updateAccessRoleByIdService(data);
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
