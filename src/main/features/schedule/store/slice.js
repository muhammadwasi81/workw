import { createSlice, current, isPending, isRejected } from "@reduxjs/toolkit";
import moment from "moment";
import {
	addSchedule,
	getAllCurrentSchedule,
	getAllEventSchedule,
	getAllSchedule,
	getAllUpcomingSchedule,
	getScheduleById,
} from "./action";

const scheduleSlice = createSlice({
	name: "schedule",
	initialState: {
		eventDetailComposer: false,
		eventDetail: null,
		loading: false,
		success: false,
		error: false,
		schedules: [],
		eventSchedules: [],
		currentSchedules: [],
		upcomingSchedules: [],
		drawerOpen: false,
		scheduleComposerData: null,
	},
	reducers: {
		handleOpenComposer: (state, { payload }) => {
			state.drawerOpen = payload;
		},
		toggleEventDetailComposer: (state, { payload }) => {
			state.eventDetailComposer = !state.eventDetailComposer;
			state.scheduleComposerData = payload;
		},
		// handleComposer
	},
	extraReducers: builder => {
		builder

			.addCase(addSchedule.fulfilled, (state, { payload }) => {
				state.loading = false;
				state.success = true;
				state.schedules.push(payload.data);
			})
			.addCase(getAllSchedule.fulfilled, (state, { payload }) => {
				state.loading = false;
				state.success = true;
				state.schedules = payload.data;
				state.schedules = payload.data.map(sched => {
					let endDate = moment(sched.endDate);
					let startDate = moment(sched.startDate);
					// console.log(
					// 	"moment(sched.startDate)",
					// 	endDate.diff(startDate, "hours")
					// );
					if (endDate.diff(startDate, "hours") > 20) {
						return {
							...sched,
							allDay: true,
						};
					}
					return {
						...sched,
					};
				});
			})
			.addCase(getScheduleById.fulfilled, (state, { payload }) => {
				state.eventDetail = payload.data;
				state.loading = false;
				state.success = true;
			})
			.addCase(getAllEventSchedule.fulfilled, (state, { payload }) => {
				state.loading = false;
				state.success = true;
				state.eventSchedules = payload.data;
			})
			.addCase(getAllCurrentSchedule.fulfilled, (state, { payload }) => {
				state.loading = false;
				state.success = true;
				state.currentSchedules = payload.data;
			})
			.addCase(getAllUpcomingSchedule.fulfilled, (state, { payload }) => {
				state.loading = false;
				state.success = true;
				state.upcomingSchedules = payload.data;
			})
			.addMatcher(
				isPending(
					...[
						addSchedule,
						getAllSchedule,
						getAllEventSchedule,
						getAllCurrentSchedule,
						getAllUpcomingSchedule,
						getScheduleById,
					]
				),
				state => {
					state.loading = true;
					state.success = false;
				}
			)
			.addMatcher(
				isRejected(
					...[
						addSchedule,
						getAllSchedule,
						getScheduleById,
						// getAllEventSchedule,
						// getAllCurrentSchedule,
					]
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
export const {
	toggleEventDetailComposer,
	handleOpenComposer,
} = scheduleSlice.actions;
