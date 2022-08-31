import { createAsyncThunk } from "@reduxjs/toolkit";
import { responseCode } from "../../../../services/enums/responseCode";
import {
	addProjectService,
	getAllProjectsService,
	getProjectByIdService,
	updateProjectService,
} from "../services/service";

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

export const addProject = createAsyncThunk(
	"addProject",
	async (data, { dispatch, getState, rejectWithValue }) => {
		const res = await addProjectService(data);
		if (res.responseCode === responseCode.Success) {
			return res;
		} else {
			return rejectWithValue(res.message);
		}
	}
);

export const updateProject = createAsyncThunk(
	"updateProject",
	async (data, { dispatch, getState, rejectWithValue }) => {
		const res = await updateProjectService(data);
		if (res.responseCode === responseCode.Success) {
			return res;
		} else {
			return rejectWithValue(res.message);
		}
	}
);

export const getProjectById = createAsyncThunk(
	"getProjectById",
	async (data, { dispatch, getState, rejectWithValue }) => {
		const res = await getProjectByIdService(data);
		if (res.responseCode === responseCode.Success) {
			return res;
		} else {
			return rejectWithValue(res.message);
		}
	}
);
