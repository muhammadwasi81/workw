import { createAsyncThunk } from "@reduxjs/toolkit";
import { responseCode } from "../../../../services/enums/responseCode";
import {
	responseMessage,
	responseMessageType,
} from "../../../../services/slices/notificationSlice";

import { addEmployeeService } from "../services/service";

export const addEmployee = createAsyncThunk(
	"addEmployee",
	async (data, { dispatch, getState, rejectWithValue }) => {
		const res = await addEmployeeService(data);
		if (res.responseCode === responseCode.Success) {
			console.log("success");
			responseMessage({
				dispatch: dispatch,
				data: res,
				type: responseMessageType.ApiSuccess,
			});
			return res;
		} else {
			console.log("error");
			responseMessage({
				dispatch: dispatch,
				data: res,
				type: responseMessageType.ApiFailure,
			});
			return rejectWithValue(res.message);
		}
		// console.log("response after sending", res);
		// return res;
	}
);
