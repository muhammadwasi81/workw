import { createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";
import { responseCode } from "../../../../services/enums/responseCode";
import {
	responseMessage,
	responseMessageType,
} from "../../../../services/slices/notificationSlice";
import {
	addBranchService,
	getAllBranchService,
	removeBranchService,
	updateBranchService,
} from "../services/service";

export const getAllBranch = createAsyncThunk(
	"Branch/getAlBranch",
	async (args, { dispatch }) => {
		const res = await getAllBranchService();
		if (!res.responseCode) {
			responseMessage({
				dispatch: dispatch,
				type: responseMessageType.ApiFailure,
			});
		}
		return res;
	}
);

export const addBranch = createAsyncThunk(
	"Branch/addBranch",
	async (args, { dispatch }) => {
		const res = await addBranchService(args);
		if (res.responseCode) {
			if (res.responseCode === responseCode.Success) {
				message.success("Subsidiary added successfully!")
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

export const removeBranch = createAsyncThunk(
	"Branch/removeBranch",
	async (args, { dispatch }) => {
		const res = await removeBranchService(args.id);

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
