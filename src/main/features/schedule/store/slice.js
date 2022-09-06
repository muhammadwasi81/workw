import { createSlice, current, isPending, isRejected } from "@reduxjs/toolkit";
import { addSchedule, getAllEventSchedule, getAllSchedule } from "./action";

const scheduleSlice = createSlice({
	name: "schedule",
	initialState: {
		eventDetailComposer: false,
		loading: false,
		success: false,
		error: false,
		schedules: [],
		eventSchedules: [],
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
				// state.schedules = payload.data;
			})
			.addCase(getAllSchedule.fulfilled, (state, { payload }) => {
				state.loading = false;
				state.success = true;
				state.schedules = payload.data;
			})
			.addCase(getAllEventSchedule.fulfilled, (state, { payload }) => {
				state.loading = false;
				state.success = true;
				state.eventSchedules = payload.data;
			})
			.addMatcher(
				isPending(
					...[addSchedule, getAllSchedule, getAllEventSchedule]
				),
				state => {
					state.loading = true;
					state.success = false;
				}
			)
			.addMatcher(
				isRejected(
					...[addSchedule, getAllSchedule, getAllEventSchedule]
				),
				state => {
					state.loading = false;
					state.success = false;
					state.error = true;
				}
			);
	},
});

export default scheduleSlice.reducer;
export const { toggleEventDetailComposer } = scheduleSlice.actions;
