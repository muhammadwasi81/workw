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
	getTaxSlabGroupById,
	removeTaxSlabService,
	updateTaxSlabService,
} from "../services/service";

export const getAllTaxSlab = createAsyncThunk(
	"TaxSlabsGroup/getAllTaxSlab",
	async (args, { dispatch }) => {
		const res = await getAllTaxSlabService(args);
		console.log(res,"arguments");
		if (!res.responseCode) {
			responseMessage({
				dispatch: dispatch,
				type: responseMessageType.ApiFailure,
			});
		}
		return res;
	}
);

export const getTaxSlabById = createAsyncThunk(
	"TaxSlabsGroup/getTaxSlabByIdGroup",
	async (args, { dispatch }) => {
		const res = await getTaxSlabGroupById(args.id);
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
	"TaxSlabsGroup/addTaxSlab",
	async (args, { dispatch }) => {
		const res = await addTaxSlabService(args);
		if (res.responseCode) {
			if (res.responseCode === responseCode.Success) {
				message.success("Tax Slab Group added successfully!")
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

