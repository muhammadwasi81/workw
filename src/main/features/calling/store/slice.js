import { createSlice, current, isPending, isRejected } from "@reduxjs/toolkit";
import { createRoom } from "./action";

const initialState = {
	isCreateRoomModalOpen: false,
	loading: false,
	success: false,
	error: false,
	roomId: "",
};
const callingSlice = createSlice({
	name: "calling",
	initialState,
	reducers: {
		handleCreateRoomModal(state, { payload }) {
			state.isCreateRoomModalOpen = !state.isCreateRoomModalOpen;
			state.success = false;
			state.loading = false;
			state.error = false;
			state.roomId = "";
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
			.addMatcher(isPending(createRoom), state => {
				state.loading = true;
				state.success = false;
				state.roomId = "";
			});
	},
});

export const { handleCreateRoomModal } = callingSlice.actions;

export default callingSlice.reducer;
