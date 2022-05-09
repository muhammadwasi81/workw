import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { addTravel } from "./actions";

const initialState = {
	travels: [],
	loader: false,
	success: false,
	error: false,
};

const travelSlice = createSlice({
	name: "travel",
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(addTravel.fulfilled, (state, { payload }) => {
				state.loader = false;
				state.success = true;
			})
			.addMatcher(isPending(addTravel), state => {
				console.log("pending");
				state.loader = true;
				state.success = false;
			})
			.addMatcher(isRejected(), state => {
				state.loader = false;
				state.success = false;
			});
	},
});
export default travelSlice.reducer;
