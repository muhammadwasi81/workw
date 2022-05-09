import { createAsyncThunk } from "@reduxjs/toolkit";
import { responseCode } from "../../../../services/enums/responseCode";
import {
	responseMessage,
	responseMessageType,
} from "../../../../services/slices/notificationSlice";
import AxiosConfig from "../../../../utils/services/AxiosConfig";
import { gradeDeleted } from "../../grade/store/slice";
import {
	addOfficeTimingService,
	getAllOfficeTimingService,
} from "../services/service";

const API_PREFIX = "konnectapi/api/OfficeTimingGroup/";

export const getAllOfficeTimingGroups = createAsyncThunk(
	"OfficeTiming/getAllOfficeTimingGroups",
	async (args, { dispatch, getState }) => {
		const res = await getAllOfficeTimingService();

		if (!res.responseCode) {
			responseMessage({
				dispatch: dispatch,
				type: responseMessageType.ApiFailure,
			});
		}
		return res;
	}
);

export const addOfficeTimingGroup = createAsyncThunk(
	"OfficeTimingGroup/addOfficeTimingGroup",
	async (args, { dispatch, getState }) => {
		console.log(args, "ssss");
		const res = await addOfficeTimingService(args);

		if (res.responseCode) {
			if (res.responseCode === responseCode.Success)
				res.message = "Office Timing Group added successfully!";
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

export const updateGrade = createAsyncThunk(
	"grade/updateGrade",
	async (args, { dispatch, getState }) => {
		return await AxiosConfig.put(`${API_PREFIX}updategrade`, args)
			.then(res => {
				if (res.data.responseCode === responseCode.Success)
					res.data.message = "Grade updated successfully!";
				responseMessage({ dispatch, data: res.data });
				return res.data;
			})
			.catch(err => {
				responseMessage({
					dispatch: dispatch,
					type: responseMessageType.ApiFailure,
				});
				return err;
			});
	}
);

export const removeGrade = createAsyncThunk(
	"grade/removeGrade",
	async (args, { dispatch, getState }) => {
		return await AxiosConfig.delete(
			`${API_PREFIX}removegrade?id=${args.id}`
		)
			.then(res => {
				if (res.data.responseCode === responseCode.Success) {
					res.data.message = "Grade removed successfully!";
					dispatch(gradeDeleted(args));
				}
				responseMessage({ dispatch, data: res.data });
				return res.data;
			})
			.catch(err => {
				responseMessage({
					dispatch: dispatch,
					type: responseMessageType.ApiFailure,
				});
				return err;
			});
	}
);
