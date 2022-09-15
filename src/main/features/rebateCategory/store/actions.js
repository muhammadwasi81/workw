import { createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";
import { responseCode } from "../../../../services/enums/responseCode";
import {
	responseMessage,
	responseMessageType,
} from "../../../../services/slices/notificationSlice";
import {
	addRebateCategoryService,
	getAllRebateCategoriesService,
	removeRebateCategoryService,
	updateRebateCategoryService,
} from "../services/service";

export const getAllRebateCategories = createAsyncThunk(
	"RebateCategory/getAllRebateCategory",
	async (args, { dispatch }) => {
		const res = await getAllRebateCategoriesService();
		if (!res.responseCode) {
			responseMessage({
				dispatch: dispatch,
				type: responseMessageType.ApiFailure,
			});
		}
		return res;
	}
);

export const addRebateCategory = createAsyncThunk(
	"RebateCategory/addRebateCategory",
	async (args, { dispatch }) => {
		const res = await addRebateCategoryService(args);
		if (res.responseCode) {
			if (res.responseCode === responseCode.Success)
				message.success(res.message)
				if (res.responseCode === responseCode.Failure || res.responseCode === responseCode.ServerError) {
					message.error(res.message)
				}
		} else {
			message.error("Something Went Wrong")
		}

		return res;
	}
);

export const updateRebateCategory = createAsyncThunk(
	"RebateCategory/updateRebateCategory",
	async (args, { dispatch }) => {
		const res = await updateRebateCategoryService(args);

		if (res.responseCode) {
			if (res.responseCode === responseCode.Success)
				res.message = "Rebate Category updated successfully!";
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

export const removeRebateCategory = createAsyncThunk(
	"RebateCategory/removeRebateCategory",
	async (args, { dispatch }) => {
		const res = await removeRebateCategoryService(args.id);

		if (res.responseCode) {
			if (res.responseCode === responseCode.Success)
				res.message = "Rebate removed successfully!";
				dispatch(getAllRebateCategories())
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
