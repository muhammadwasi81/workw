import { createSlice, current, isPending, isRejected } from "@reduxjs/toolkit";
import { callingWindowOptions, handleOpenCallWindow } from "../../../../utils/base";
import { servicesUrls } from "../../../../utils/services/baseURLS";
import { OUTGOING_CALL_STATUS } from "../constant/enum";
import { createRoom, instantCall } from "./action";

const defaultOutgoingData = {
	isOpen: false,
	status: OUTGOING_CALL_STATUS.NO_STATUS,
	members: [],
	roomId: ""
}
const defaultCallingWindow = {
	roomId: "",
	isOpen: false
}

const initialState = {
	isCreateRoomModalOpen: false,
	loading: false,
	success: false,
	error: false,
	roomId: "",
	incomingCallData: null,
	outgoingCallData: { ...defaultOutgoingData },
	callingWindows: []
};
const callingSlice = createSlice({
	name: "calling",
	initialState,
	reducers: {
		handleCreateRoomModal(state, { payload }) {
			state.isCreateRoomModalOpen = payload;
			state.success = false;
			state.loading = false;
			state.error = false;
			state.roomId = "";
		},
		handleIncomingCall(state, { payload }) {
			state.incomingCallData = payload;
		},
		handleOutgoingCall(state, { payload }) {
			state.outgoingCallData = payload;
		},
		handleOutgoingCallAccepted(state, { payload }) {
			const callReceiverId = payload.userId;
			const authToken = payload.token;
			if (state.outgoingCallData.members.some(member => member.id === callReceiverId)) {
				// handleOpenCallWindow(servicesUrls.callingSocket + state.outgoingCallData.roomId, callingWindowOptions);
				
				state.callingWindows = [
					{
						callUrl: `${servicesUrls.callingSocket}${state.outgoingCallData.roomId}?token=${authToken}`,
						isOpen: true
					}
				]
				state.outgoingCallData = { ...defaultOutgoingData }
			}
		},
		handleOutgoingCallDeclined(state, { payload }) {
			const callReceiverId = payload;
			if (state.outgoingCallData.members.some(member => member.id === callReceiverId)) {
				state.outgoingCallData = { ...defaultOutgoingData }
			}
		},
		handleOutgoingCallRinging(state, { payload }) {
			const callReceiverId = payload;
			if (state.outgoingCallData.members.some(member => member.id === callReceiverId)) {
				state.outgoingCallData = {
					...state.outgoingCallData,
					status: OUTGOING_CALL_STATUS.RINGING
				}
			}
		},
		handleAddCallWindow(state, { payload }) {
			state.callingWindows = [payload];
		},
		handleRemoveCallWindow(state, { payload }) {
			state.callingWindows = [];
		},
		toggleCallWindow(state, { payload }) {
			let status = payload;
			if (!!state.callingWindows.length)
				state.callingWindows[0].isOpen = status;
		},
	},
	extraReducers: builder => {
		builder
			.addCase(createRoom.fulfilled, (state, { payload }) => {
				state.loading = false;
				state.success = true;
				state.error = false;
				state.roomId = payload.data.roomId;
			})
			.addCase(instantCall.fulfilled, (state, { payload }) => {
				state.loading = false;
				state.success = true;
				state.error = false;
				state.roomId = payload.data.roomId;
			})
			.addMatcher(isPending(...[createRoom, instantCall]), state => {
				state.loading = true;
				state.success = false;
				state.roomId = "";
			})
			.addMatcher(isRejected(...[createRoom, instantCall]), state => {
				state.loading = false;
				state.success = false;
				state.roomId = "";
			});
	},
});

export const {
	handleCreateRoomModal,
	handleIncomingCall,
	handleOutgoingCall,
	handleOutgoingCallAccepted,
	handleOutgoingCallDeclined,
	handleOutgoingCallRinging,
	handleAddCallWindow,
	handleRemoveCallWindow,
	toggleCallWindow
} = callingSlice.actions;

export default callingSlice.reducer;
