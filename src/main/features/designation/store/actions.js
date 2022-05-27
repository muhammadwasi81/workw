import { createAsyncThunk } from "@reduxjs/toolkit";
import { responseCode } from "../../../../services/enums/responseCode";
import {
	responseMessage,
	responseMessageType,
} from "../../../../services/slices/notificationSlice";
import {
	addDesignationService,
	getAllDesignationsService,
	removeDesignationService,
	updateDesignationService,
} from "../services/service";

export const getAllDesignation = createAsyncThunk(
	"Designation/getAllDesignation",
	async (args, { dispatch }) => {
		const res = await getAllDesignationsService();
		console.log("GET ALL DESIGNATION ACTION", res)
		if (!res.responseCode) {
			responseMessage({
				dispatch: dispatch,
				type: responseMessageType.ApiFailure,
			});
		}
		return res;
	}
);

export const addDesignation = createAsyncThunk(
	"Designation/addDesignation",
	async (args, { dispatch }) => {
		const res = await addDesignationService(args);

		if (res.responseCode) {
			if (res.responseCode === responseCode.Success)
				res.message = "Designation added successfully!";
			responseMessage({ dispatch, data: res });
		} else {
			responseMessage({
				dispatch: dispatch,
				type: responseMessageType.ApiFailure,
			});
		}

		return res;
	}
);

export const updateDesignation = createAsyncThunk(
	"Designation/updatedesignation",
	async (args, { dispatch }) => {
		const res = await updateDesignationService(args);

		if (res.responseCode) {
			if (res.responseCode === responseCode.Success)
				res.message = "Designation updated successfully!";
			responseMessage({ dispatch, data: res });
		} else {
			responseMessage({
				dispatch: dispatch,
				type: responseMessageType.ApiFailure,
			});
		}

		return res;
	}
);

export const removeDesignation = createAsyncThunk(
	"Designation/removeDesignation",
	async (args, { dispatch }) => {
		const res = await removeDesignationService(args.id);

		if (res.responseCode) {
			if (res.responseCode === responseCode.Success)
				res.message = "Designation removed successfully!";
			responseMessage({ dispatch, data: res });
		} else {
			responseMessage({
				dispatch: dispatch,
				type: responseMessageType.ApiFailure,
			});
		}

		return res;
	}
);
