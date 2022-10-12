import { createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";
import { responseCode } from "../../../../../services/enums/responseCode";
import {
	responseMessage,
	responseMessageType,
} from "../../../../../services/slices/notificationSlice";
import {
	addDefaultHiringCriteriaService,
	getAllDefaultHiringCriteriaService,
	removeDefaultHiringCriteriaService,
	removePayrollGroupService,
	updateDefaultHiringCriteriaService,
	updatePayrollGroupService,
} from "../services/service";

export const getAllDefaultHiringCriteria = createAsyncThunk(
	"DefaultHiringCriteria/getAllDefaultHiringCriteria",
	async (args, { dispatch }) => {
		const res = await getAllDefaultHiringCriteriaService();
		if (!res.responseCode) {
			responseMessage({
				dispatch: dispatch,
				type: responseMessageType.ApiFailure,
			});
		}
		return res;
	}
);

export const addDefaultHiringCriteria = createAsyncThunk(
	"DefaultHiringCriteria/addDefaultHiringCriteria",
	async (args, { dispatch }) => {
		const res = await addDefaultHiringCriteriaService(args);
		if (res.responseCode) {
			if (res.responseCode === responseCode.Success) {
				message.success("Question added successfully!")
				responseMessage({ dispatch, data: res });
				return res
			} else {
				message.error(res.message)
			}
		}else {
			message.error("Something went Wrong")
		}
	}
);

export const updateDefaultHiringCriteria = createAsyncThunk(
	"PayrollGroup/updatePayrollGroup",
	async (args, { dispatch }) => {
		const res = await updateDefaultHiringCriteriaService(args);
		if (res.responseCode) {
			if (res.responseCode === responseCode.Success) {
				message.success("Question updated successfully!")
				responseMessage({ dispatch, data: res });
				return res
			} else {
				message.error(res.message)
			}
		}else {
			message.error("Something went Wrong")
		}

		return res;
	}
);

export const removeDefaultHiringCriteria = createAsyncThunk(
	"PayrollGroup/removePayrollGroup",
	async (args, { dispatch }) => {
		const res = await removeDefaultHiringCriteriaService(args.id);

		if (res.responseCode) {
			if (res.responseCode === responseCode.Success)
				message.success("Question removed successfully!")
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
