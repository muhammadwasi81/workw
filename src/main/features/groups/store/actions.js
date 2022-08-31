import { createAsyncThunk } from "@reduxjs/toolkit";
import { addGroupService, getAllGroupService } from "../services/service";
import { responseCode } from "../../../../services/enums/responseCode";
import { openNotification } from "../../../../utils/Shared/store/slice";

export const getAllGroup = createAsyncThunk(
	"getAllGroup",
	async (data, { dispatch, getState, rejectWithValue }) => {
		const res = await getAllGroupService(data);
		if (res.responseCode === responseCode.Success) {
			return res;
		} else {
			return rejectWithValue(res.message);
		}
	}
);

export const addGroup = createAsyncThunk(
	"addGroup",
	async (data, { dispatch, getState, rejectWithValue }) => {
		const res = await addGroupService(data);
		if (res.responseCode === responseCode.Success) {
			dispatch(
				openNotification({
					message: "Group Created Successfully",
					type: "success",
					duration: 2,
				})
			);

			return res;
		} else {
			dispatch(
				openNotification({
					message: res.message,
					type: "error",
					duration: 2,
				})
			);
			return rejectWithValue(res.message);
		}
	}
);
