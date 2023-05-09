import { createSlice, current, isPending, isRejected } from "@reduxjs/toolkit";
import moment from "moment";
import { ScheduleTypeEnum } from "../enum/enum";
import {
  addSchedule,
  getAllCurrentSchedule,
  getAllEventSchedule,
  getAllSchedule,
  getAllUpcomingSchedule,
  getScheduleById,
  updateMemberScheduleStatus,
  updateScheduleMemberType,
  addScheduleMemberAction,
  getAllScheduleMemberAction,
  getCalendar,
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
    scheduleSearch: "",
    scheduleTabs: "0",
    referenceType: 0,
    scheduleMember: [],
    calendar: [],
  },
  reducers: {
    handleOpenComposer: (state, { payload }) => {
      state.drawerOpen = payload;
    },
    toggleEventDetailComposer: (state, { payload }) => {
      state.eventDetailComposer = !state.eventDetailComposer;
      state.scheduleComposerData = payload;
    },
    handleScheduleSearch: (state, { payload }) => {
      state.scheduleSearch = payload;
    },
    handleScheduleTab: (state, { payload }) => {
      state.scheduleTabs = payload;
    },
    handleReferenceTypeChange: (state, { payload }) => {
      console.log(payload);
      state.referenceType = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addSchedule.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.schedules.push({
          ...payload.data,
          startDate: moment.utc(payload.data.startDate).local(),
          endDate: moment.utc(payload.data.endDate).local(),
        });
        if (moment(payload.data.startDate).isSame(moment(), "day")) {
          state.currentSchedules.push({
            ...payload.data,
            startDate: moment.utc(payload.data.startDate).local(),
            endDate: moment.utc(payload.data.endDate).local(),
          });
        }
        if (moment(payload.data.startDate).isAfter(moment())) {
          state.upcomingSchedules.push({
            ...payload.data,
            startDate: moment.utc(payload.data.startDate).local(),
            endDate: moment.utc(payload.data.endDate).local(),
          });
        }
        state.eventSchedules.push({
          ...payload.data,
          startDate: moment.utc(payload.data.startDate).local(),
          endDate: moment.utc(payload.data.endDate).local(),
        });
      })
      .addCase(getAllSchedule.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.schedules = payload.data.map((sched) => {
          let endDate = moment.utc(sched.endDate).local();
          let startDate = moment.utc(sched.startDate).local();
          let returnedValue = {
            ...sched,
            endDate: moment.utc(sched.endDate).local(),
            startDate: moment.utc(sched.startDate).local(),
          };
          if (sched.scheduleType === ScheduleTypeEnum.Task) {
            returnedValue = {
              ...returnedValue,
              color: "purple",
            };
          }
          if (sched.scheduleType === ScheduleTypeEnum.Travel) {
            returnedValue = {
              ...returnedValue,
              color: "red",
            };
          }

          if (endDate.diff(startDate, "hours") > 20) {
            returnedValue = {
              ...returnedValue,
              allDay: true,
            };
          }
          return {
            ...returnedValue,
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
        state.eventSchedules = payload.data.map((eventSchedules) => ({
          ...eventSchedules,
          startDate: moment.utc(eventSchedules.startDate).local(),
          endDate: moment.utc(eventSchedules.endDate).local(),
        }));
      })
      .addCase(getAllCurrentSchedule.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.currentSchedules = payload.data.map((todaySchedule) => ({
          ...todaySchedule,
          startDate: moment.utc(todaySchedule.startDate).local(),
          endDate: moment.utc(todaySchedule.endDate).local(),
        }));
      })
      .addCase(getAllUpcomingSchedule.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.upcomingSchedules = payload.data.map((upcomingSchedules) => ({
          ...upcomingSchedules,
          startDate: moment.utc(upcomingSchedules.startDate).local(),
          endDate: moment.utc(upcomingSchedules.endDate).local(),
        }));
      })
      .addCase(updateMemberScheduleStatus.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        const filteredMemberIndex = state.eventDetail.members.findIndex(
          (member) => member.id === payload.data.id
        );
        state.eventDetail.members[filteredMemberIndex] = payload.data;
      })
      .addCase(updateScheduleMemberType.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        const filteredMemberIndex = state.eventDetail.members.findIndex(
          (member) => member.id === payload.data.id
        );
        state.eventDetail.members[filteredMemberIndex] = payload.data;
      })
      .addCase(addScheduleMemberAction.fulfilled, (state, { payload }) => {
        state.success = true;
        state.scheduleMember = [...state.scheduleMember, payload.data[0]];
      })
      .addCase(getAllScheduleMemberAction.fulfilled, (state, { payload }) => {
        state.success = true;
        state.scheduleMember = payload.data;
      })
      .addCase(getCalendar.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.calendar = payload.data;
        console.log(payload.data, "payloaddd dataaa");
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
            updateMemberScheduleStatus,
            updateScheduleMemberType,
            // addScheduleMemberAction,
            getAllScheduleMemberAction,
          ]
        ),
        (state) => {
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
            updateMemberScheduleStatus,
            updateScheduleMemberType,
            // addScheduleMemberAction,
            getAllScheduleMemberAction,
            // getAllEventSchedule,
            // getAllCurrentSchedule,
          ]
        ),
        (state) => {
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
  handleScheduleSearch,
  handleScheduleTab,
  handleReferenceTypeChange,
} = scheduleSlice.actions;
