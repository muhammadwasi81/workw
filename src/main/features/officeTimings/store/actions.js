import { createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";
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
	async (args, { dispatch }) => {
		const res = await addOfficeTimingService(args);
		if (res.responseCode && res.responseCode === responseCode.Success) {
			message.success("Office Timing Group added successfully!")
			responseMessage({ dispatch, data: res });
		} else {
			message.error(res.message)
		}
		return res;
	}
);
