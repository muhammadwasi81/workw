import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { addLeave, getAllLeaves, GetRewardById } from "./actions";

const initialState = {
	leaves: [],
	loadingData: false,
	loader: true,
	rewardDetail: null,
};

const leaveSlice = createSlice({
	name: "leaves",
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder.addCase(getAllLeaves.fulfilled, (state, action) => {
			state.leaves = action.payload ? action.payload : [];
			state.loader = false;
		});

		builder.addCase(GetRewardById.fulfilled, (state, action) => {
			console.log("action.payload", action.payload);
			state.rewardDetail = action.payload.data;
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

export const {} = leaveSlice.actions;
export default leaveSlice.reducer;
