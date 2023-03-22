import { addDeviceService, createRoomService, instantCallService } from "../services/services";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { responseCode } from "../../../../services/enums/responseCode";
import { openNotification } from "../../../../utils/Shared/store/slice";
import { handleAddCallWindow, handleCreateRoomModal, handleOutgoingCall } from "./slice";
import { servicesUrls } from "../../../../utils/services/baseURLS";
import { callingWindowOptions } from "../../../../utils/base";
import { CALL_MEDIA_TYPE } from "../constant/enum";

export const createRoom = createAsyncThunk(
	"createRoom",
	async (data, { dispatch, getState, rejectWithValue }) => {
		const user = getState().userSlice.user;
		const res = await createRoomService(data);

		if (res.responseCode === responseCode.Success) {
			dispatch(
				openNotification({
					message: "Room Has Been Created Successfully!",
					type: "success",
					duration: 2,
				})
			);
			dispatch(handleAddCallWindow({
				callUrl: `${servicesUrls.callingSocket}${res.data.roomId}?token=${user.accessToken}?isVideo=1`,
				isOpen: true
			}));
			// dispatch(handleOutgoingCall({
			// 	isOpen: true,
			// 	status: 0,
			// 	members: data.members.map(member => member.user),
			// 	roomId: res.data.roomId,
			// 	mediaType: data.mediaType
			// }));
			
			// window.open(servicesUrls.callingSocket + res.data.roomId, "_blank", callingWindowOptions);
			return res;
		} else {
			dispatch(
				openNotification({
					message: res.message.message,
					type: "error",
					duration: 2,
				})
			);
			return rejectWithValue(res.message.message);
		}
	}
);

export const createDirectCall = createAsyncThunk(
	"createDirectCall",
	async (data, { dispatch, getState, rejectWithValue }) => {
		const res = await createRoomService(data);

		if (res.responseCode === responseCode.Success) {
			dispatch(handleOutgoingCall({
				isOpen: true,
				status: 0,
				members: data.members.map(member => member.user),
				roomId: res.data.roomId,
				mediaType: data.mediaType
			}));
			return res;
		} else {
			dispatch(
				openNotification({
					message: res.message.message,
					type: "error",
					duration: 2,
				})
			);
			return rejectWithValue(res.message.message);
		}
	}
);


export const instantCall = createAsyncThunk(
	"instantCall",
	async (data, { dispatch, getState, rejectWithValue }) => {
		const user = getState().userSlice.user;
		const res = await instantCallService(data);

		if (res.responseCode === responseCode.Success) {
			dispatch(
				openNotification({
					message: "Opening instant call..",
					type: "success",
					duration: 2,
				})
			);
			dispatch(handleAddCallWindow({
				callUrl: `${servicesUrls.callingSocket}${res.data.roomId}?token=${user.accessToken}?isVideo=1`,
				isOpen: true
			}));
			return res;
		} else {
			dispatch(
				openNotification({
					message: res.message.message,
					type: "error",
					duration: 2,
				})
			);
			return rejectWithValue(res.message.message);
		}
	}
);