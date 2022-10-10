import { createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";
import { responseCode } from "../../../../services/enums/responseCode";
import {
	responseMessage,
	responseMessageType,
} from "../../../../services/slices/notificationSlice";
import {
	addTaxSlabService,
	getAllTaxSlabService,
	removeTaxSlabService,
	updateTaxSlabService,
} from "../services/service";

export const getAllTaxSlab = createAsyncThunk(
	"TaxSlab/getAllTaxSlab",
	async (args, { dispatch }) => {
		const res = await getAllTaxSlabService();
		if (!res.responseCode) {
			responseMessage({
				dispatch: dispatch,
				type: responseMessageType.ApiFailure,
			});
		}
		return res;
	}
);

export const addTaxSlab = createAsyncThunk(
	"TaxSlab/addTaxSlab",
	async (args, { dispatch }) => {
		const res = await addTaxSlabService(args);
		if (res.responseCode) {
			if (res.responseCode === responseCode.Success) {
				message.success("Tax Slab added successfully!")
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

export const updateTaxSlab = createAsyncThunk(
	"TaxSlab/updateTaxSlab",
	async (args, { dispatch }) => {
		const res = await updateTaxSlabService(args);
		if (res.responseCode) {
			if (res.responseCode === responseCode.Success) {
				message.success("Tax Slab updated successfully!")
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

export const removeTaxSlab = createAsyncThunk(
	"TaxSlab/removeTaxSlab",
	async (args, { dispatch }) => {
		const res = await removeTaxSlabService(args.id);
		if (res.responseCode) {
			if (res.responseCode === responseCode.Success)
				message.success("Tax Slab removed successfully!")
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
