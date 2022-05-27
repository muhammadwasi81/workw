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
				console.log("travel fullfilled slice");
				state.loader = false;
				state.success = true;
			})
			.addCase(getAllTravel.fulfilled, (state, { payload }) => {
				console.log("travel fullfilled slice");
				state.loader = false;
				state.success = true;
				state.travels = payload.data;
			})
			.addMatcher(isPending(...[addTravel, getAllTravel]), state => {
				console.log("travel pending slice");
				state.loader = true;
				state.success = false;
			})
			.addMatcher(isRejected(), state => {
				console.log("travel rejected slice");
				state.loader = false;
				state.success = false;
			});
	},
});
export default travelSlice.reducer;
