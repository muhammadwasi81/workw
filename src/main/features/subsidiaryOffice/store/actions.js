import { createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";
import { responseCode } from "../../../../services/enums/responseCode";
import {
	responseMessage,
	responseMessageType,
} from "../../../../services/slices/notificationSlice";
import {
	addbranchOfficeService,
	getAllBranchOfficeService,
	removeBranchOfficeService,
	updateBranchService,
} from "../services/service";

export const getAllBranchOffice = createAsyncThunk(
	"BranchOffice/getAlBranchOffice",
	async (args, { dispatch }) => {
		const res = await getAllBranchOfficeService();
		if (!res.responseCode) {
			responseMessage({
				dispatch: dispatch,
				type: responseMessageType.ApiFailure,
			});
		}
		return res;
	}
);

export const addBranchOffice = createAsyncThunk(
	"BranchOffice/addBranchOffice",
	async (args, { dispatch }) => {
		const res = await addbranchOfficeService(args);
		if (res.responseCode) {
			if (res.responseCode === responseCode.Success) {
				message.success("Subsidiary Office added successfully!")
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

export const updateBranch = createAsyncThunk(
	"Branch/updateBranch",
	async (args, { dispatch }) => {
		const res = await updateBranchService(args);
		if (res.responseCode) {
			if (res.responseCode === responseCode.Success) {
				message.success("Subsidiary updated successfully!")
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

export const removeBranchOffice = createAsyncThunk(
	"BranchOffice/removeBranchOffice",
	async (args, { dispatch }) => {
		const res = await removeBranchOfficeService(args.id);

		if (res.responseCode) {
			if (res.responseCode === responseCode.Success)
				message.success("Subsidiary removed successfully!")
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
