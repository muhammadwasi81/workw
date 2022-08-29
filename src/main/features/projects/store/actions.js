import { createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";
import { responseCode } from "../../../../services/enums/responseCode";
import { getAllProjectsService } from "../services/service";

export const getAllProjects = createAsyncThunk(
	"getAllProject",
	async (data, { dispatch, getState, rejectWithValue }) => {
		const res = await getAllProjectsService(data);
		if (res.responseCode === responseCode.Success) {
			return res;
		} else {
			return rejectWithValue(res.message);
		}
	}
);
