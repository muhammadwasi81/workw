import { createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";
import { responseCode } from "../../../../services/enums/responseCode";
import {
	responseMessage,
	responseMessageType,
} from "../../../../services/slices/notificationSlice";
import {
	addFiscalYearService,
	getAllFiscalYearService,
	removeFiscalYearService,
	updateFiscalYearService,
} from "../services/service";

export const getAllFiscalYear = createAsyncThunk(
	"FiscalYear/getAllFiscalYear",
	async (args, { dispatch }) => {
		const res = await getAllFiscalYearService();
		if (!res.responseCode) {
			responseMessage({
				dispatch: dispatch,
				type: responseMessageType.ApiFailure,
			});
		}
		return res;
	}
);

export const addFiscalYear = createAsyncThunk(
	"FiscalYear/addFiscalYear",
	async (args, { dispatch }) => {
		const res = await addFiscalYearService(args);
		if (res.responseCode) {
			if (res.responseCode === responseCode.Success) {
				message.success("Fiscal Year added successfully!")
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

export const updateFiscalYear = createAsyncThunk(
	"FiscalYear/updateFiscalYear",
	async (args, { dispatch }) => {
		const res = await updateFiscalYearService(args);
		if (res.responseCode) {
			if (res.responseCode === responseCode.Success) {
				message.success("Fiscal Year updated successfully!")
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

export const removeFiscalYear = createAsyncThunk(
	"FiscalYear/removeFiscalYear",
	async (args, { dispatch }) => {
		const res = await removeFiscalYearService(args.id);

		if (res.responseCode) {
			if (res.responseCode === responseCode.Success)
				message.success("Fiscal Year removed successfully!")
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
