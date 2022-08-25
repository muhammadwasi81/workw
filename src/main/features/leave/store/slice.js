import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { addLeave, getAllLeaves, GetLeaveById } from "./actions";

const initialState = {
	leaves: [],
	loadingData: false,
	loader: true,
	leaveDetail: null,
	drawerOpen: false,
};

const leaveSlice = createSlice({
	name: "leaves",
	initialState,
	reducers: {
		handleOpenComposer: (state, { payload }) => {
			state.drawerOpen = payload
		},
	},
	extraReducers: builder => {
		builder.addCase(getAllLeaves.fulfilled, (state, action) => {
			state.leaves = action.payload ? action.payload : [];
			state.loader = false;
		});

		builder.addCase(GetLeaveById.fulfilled, (state, action) => {
			state.leaveDetail = action.payload.data;
		});

		builder
			.addCase(addLeave.fulfilled, (state, { payload }) => {
				state.leaveData = payload;
				return state;
			})
			.addMatcher(isPending(...[getAllLeaves]), state => {
				state.loader = true;
			})
			.addMatcher(isRejected(...[getAllLeaves]), state => {
				state.loader = true;
			});
	},
});

export const { handleOpenComposer } = leaveSlice.actions;
export default leaveSlice.reducer;
