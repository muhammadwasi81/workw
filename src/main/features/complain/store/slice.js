import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { addComplain, getAllComplains, GetRewardById } from "./actions";

const initialState = {
	complains: [],
	loadingData: false,
	loader: true,
	rewardDetail: null,
};

const complainSlice = createSlice({
	name: "complains",
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder.addCase(getAllComplains.fulfilled, (state, action) => {
			state.complains = action.payload ? action.payload : [];
			state.loader = false;
		});

		builder.addCase(GetRewardById.fulfilled, (state, action) => {
			console.log("action.payload", action.payload);
			state.rewardDetail = action.payload.data;
		});

		builder
			.addCase(addComplain.fulfilled, (state, { payload }) => {
				state.complainData = payload;
				return state;
			})
			.addMatcher(isPending(...[getAllComplains]), state => {
				state.loader = true;
			})
			.addMatcher(isRejected(...[getAllComplains]), state => {
				state.loader = true;
			});
	},
});

export const {} = complainSlice.actions;
export default complainSlice.reducer;
