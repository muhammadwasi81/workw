import { createSlice, current, isPending, isRejected } from "@reduxjs/toolkit";
import { addSchedule } from "./action";

const scheduleSlice = createSlice({
	name: "schedule",
	initialState: {
		eventDetailComposer: false,
		loading: false,
		success: false,
		error: false,
		schedules: [],
	},
	reducers: {
		toggleEventDetailComposer: (state, _) => {
			state.eventDetailComposer = !state.eventDetailComposer;
		},
	},
	extraReducers: builder => {
		builder
			.addCase(addSchedule.fulfilled, (state, { payload }) => {
				state.loading = false;
				state.success = true;
				state.schedules = payload.data;
			})
			.addMatcher(isPending(...[addSchedule]), state => {
				state.loading = true;
				state.success = false;
			})
			.addMatcher(isRejected(...[addSchedule]), state => {
				state.loading = false;
				state.success = false;
				state.error = true;
			});
	},
});

export default scheduleSlice.reducer;
export const { toggleEventDetailComposer } = scheduleSlice.actions;
