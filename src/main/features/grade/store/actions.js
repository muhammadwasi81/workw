import { createAsyncThunk } from "@reduxjs/toolkit";
import { responseCode } from "../../../../services/enums/responseCode";
import {
	responseMessage,
	responseMessageType,
} from "../../../../services/slices/notificationSlice";
import AxiosConfig from "../../../../utils/services/AxiosConfig";
import { addGradeService, getAllGradesService } from "../services/service";
import { gradeDeleted } from "./slice";

const API_PREFIX = "konnectapi/api/grade/";

export const getAllGrades = createAsyncThunk(
	"grade/getAllGrade",
	async (args, { dispatch, getState }) => {
		const res = await getAllGradesService();

		if (!res.responseCode) {
			responseMessage({
				dispatch: dispatch,
				type: responseMessageType.ApiFailure,
			});
		}
		return res;
	}
);

export const addGrade = createAsyncThunk(
	"grade/addGrade",
	async (args, { dispatch, getState }) => {
		const res = await addGradeService(args);

		if (res.responseCode) {
			if (res.responseCode === responseCode.Success)
				res.message = "Grade added successfully!";
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
