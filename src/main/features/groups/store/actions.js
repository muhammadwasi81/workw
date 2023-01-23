import { createAsyncThunk } from "@reduxjs/toolkit";
import {
	addGroupService,
	getAllGroupService,
	getGroupByIdService,
	updateGroupService,
	addGroupMemberService,
	getAllGroupMemberService} from "../services/service";
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

export const updateGroup = createAsyncThunk(
	"updateGroup",
	async (data, { dispatch, getState, rejectWithValue }) => {
		const res = await updateGroupService(data);
		if (res.responseCode === responseCode.Success) {
			dispatch(
				openNotification({
					message: "Project Updated Successfully!",
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

export const getGroupById = createAsyncThunk(
	"getGroupById",
	async (id, { dispatch, getState, rejectWithValue }) => {
		const res = await getGroupByIdService(id);
		if (res.responseCode === responseCode.Success) {
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


export const addGroupMemberAction = createAsyncThunk(
	"groupMember",
	async (data, { dispatch, getState, rejectWithValue }) => {
		const res = await addGroupMemberService(data);
		if (res.responseCode === responseCode.Success) {
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


export const getAllGroupMemberAction = createAsyncThunk(
	"GetgroupMember",
	async (id, { dispatch, getState, rejectWithValue }) => {
		const res = await getAllGroupMemberService(id);
		if (res.responseCode === responseCode.Success) {
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
