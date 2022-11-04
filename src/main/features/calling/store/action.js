import { createRoomService, instantCallService } from "../services/services";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { responseCode } from "../../../../services/enums/responseCode";
import { openNotification } from "../../../../utils/Shared/store/slice";
import { handleCreateRoomModal } from "./slice";

export const createRoom = createAsyncThunk(
	"createRoom",
	async (data, { dispatch, getState, rejectWithValue }) => {
		const res = await createRoomService(data);

		if (res.responseCode === responseCode.Success) {
			dispatch(
				openNotification({
					message: "Room Has Been Created Successfully!",
					type: "success",
					duration: 2,
				})
			);
			dispatch(handleCreateRoomModal());
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

export const instantCall = createAsyncThunk(
	"instantCall",
	async (data, { dispatch, getState, rejectWithValue }) => {
		const res = await instantCallService(data);

		if (res.responseCode === responseCode.Success) {
			dispatch(
				openNotification({
					message: "Opening instant call..",
					type: "success",
					duration: 2,
				})
			);
			dispatch(handleCreateRoomModal());
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
