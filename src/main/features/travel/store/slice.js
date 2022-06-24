import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { addTravel, getAllTravel, getTravelById } from "./actions";

const initialState = {
	travels: [],
	travelDetail: null,
	loader: false,
	success: false,
	isAdded: false,
	error: false,
};

const travelSlice = createSlice({
	name: "travel",
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(addTravel.fulfilled, (state, { payload }) => {
				// console.log("travel fullfilled slice");
				state.loader = false;
				state.success = true;
				state.isAdded = true;
			})
			.addCase(getAllTravel.fulfilled, (state, { payload }) => {
				// console.log("travel fullfilled slice");
				state.loader = false;
				state.success = true;
				state.travels = payload.data;
			})
			.addCase(getTravelById.fulfilled, (state, { payload }) => {
				// console.log("travel fullfilled slice");
				state.loader = false;
				state.success = true;
				state.travelDetail = payload.data;
			})
			.addMatcher(
				isPending(...[addTravel, getAllTravel, getTravelById]),
				state => {
					// console.log("travel pending slice");
					state.loader = true;
					state.success = false;
					state.isAdded = false;
				}
			)
			.addMatcher(isRejected(), state => {
				// console.log("travel rejected slice");
				state.loader = false;
				state.success = false;
				state.isAdded = false;
			});
	},
});
export default travelSlice.reducer;
