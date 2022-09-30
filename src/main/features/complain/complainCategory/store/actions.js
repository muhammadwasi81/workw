import { createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";
import { responseCode } from "../../../../../services/enums/responseCode";
import {
	responseMessage,
	responseMessageType,
} from "../../../../../services/slices/notificationSlice";
import {
	addComplainCategoryService,
	getAllComplainCategoryService,
	removeComplainCategoryService,
	updateComplainCategoryService,
} from "../services/service";

export const getAllComplainCategory = createAsyncThunk(
	"ComplainCategory/getAllComplainCategory",
	async (args, { dispatch }) => {
		const res = await getAllComplainCategoryService();
		if (!res.responseCode) {
			responseMessage({
				dispatch: dispatch,
				type: responseMessageType.ApiFailure,
			});
		}
		return res;
	}
);

export const addComplainCategory = createAsyncThunk(
	"ComplainCategory/addComplainCategory",
	async (args, { dispatch }) => {
		const res = await addComplainCategoryService(args);
		if (res.responseCode) {
			if (res.responseCode === responseCode.Success)
				message.success("Complain Category added successfully!")
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

export const updateComplainCategory = createAsyncThunk(
	"ComplainCategory/updateComplainCategory",
	async (args, { dispatch }) => {
		const res = await updateComplainCategoryService(args);
		console.log(res, "HELLO JEE")
		if (res.responseCode) {
			if (res.responseCode === responseCode.Success)
				message.success("Complain Category updated successfully!")
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

export const removeComplainCategory = createAsyncThunk(
	"ComplainCategory/removeComplainCategory",
	async (args, { dispatch }) => {
		const res = await removeComplainCategoryService(args.id);

		if (res.responseCode) {
			if (res.responseCode === responseCode.Success)
				res.message = "Category removed successfully!";
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
