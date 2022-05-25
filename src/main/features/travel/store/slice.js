import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { addTravel, getAllTravel } from "./actions";

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
			.addCase(getAllTravel.fulfilled, (state, { payload }) => {
				state.loader = false;
				state.success = true;
				// console.log("payload", payload);
				state.travels = payload.data;
			})
			.addMatcher(isPending(...[addTravel, getAllTravel]), state => {
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
