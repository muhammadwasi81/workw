import { createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";
import { responseCode } from "../../../../../services/enums/responseCode";
import {
	responseMessage,
	responseMessageType,
} from "../../../../../services/slices/notificationSlice";
import {
	addPayrollGroupService,
	getAllPayrollGroupService,
	removePayrollGroupService,
	updatePayrollGroupService,
} from "../services/service";

export const getAllPayrollGroup = createAsyncThunk(
	"ComplainCategory/getAllComplainCategory",
	async (args, { dispatch }) => {
		const res = await getAllPayrollGroupService();
		if (!res.responseCode) {
			responseMessage({
				dispatch: dispatch,
				type: responseMessageType.ApiFailure,
			});
		}
		return res;
	}
);

export const addPayrollGroup = createAsyncThunk(
	"PayrollGroup/addPayrollGroup",
	async (args, { dispatch }) => {
		const res = await addPayrollGroupService(args);
		if (res.responseCode) {
			if (res.responseCode === responseCode.Success) {
				message.success("Group added successfully!")
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

export const updateaPayrollGroup = createAsyncThunk(
	"PayrollGroup/updatePayrollGroup",
	async (args, { dispatch }) => {
		const res = await updatePayrollGroupService(args);
		if (res.responseCode) {
			if (res.responseCode === responseCode.Success) {
				message.success("Group updated successfully!")
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

export const removePayrollGroup = createAsyncThunk(
	"PayrollGroup/removePayrollGroup",
	async (args, { dispatch }) => {
		const res = await removePayrollGroupService(args.id);

		if (res.responseCode) {
			if (res.responseCode === responseCode.Success)
				message.success("Group removed successfully!")
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
