import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import {
  updateUserWorkExperienceAction,
  addUserWorkExperienceAction,
  getUserWorkExperience,
} from "./actions";

const initialState = {
  experienceDetails: {},
  experienceInformation: [],
  loader: false,
  success: false,
};

const workExperienceSlice = createSlice({
  name: "experienceDetails",
  initialState,
  reducers: {
    handleResetEmergencyInfo: (state) => {
      state.experienceDetails = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserWorkExperience.fulfilled, (state, { payload }) => {
        console.log(payload, "getUserWorkExperience Slice");
        state.experienceInformation = payload.data;
        state.loader = false;
        state.success = true;
      })
      .addCase(updateUserWorkExperienceAction.fulfilled, (state, action) => {
        console.log(action.payload, "updateUserEmergencyContactAction Slice");
        state.experienceDetails = action.payload;
        state.loader = false;
        state.success = true;
      })
      .addCase(addUserWorkExperienceAction.fulfilled, (state, { payload }) => {
        state.experienceInformation.push(payload[0]);
        state.experienceDetails = payload[0];
        state.loader = false;
        state.success = true;
      })
      .addMatcher(isPending(...[updateUserWorkExperienceAction]), (state) => {
        state.loader = true;
      })
      .addMatcher(isPending(...[addUserWorkExperienceAction]), (state) => {
        console.log("pending adding state");
        state.loader = true;
      })
      .addMatcher(isPending(...[getUserWorkExperience]), (state) => {
        console.log("pending getUserWorkExperience state");
        state.loader = true;
      })
      .addMatcher(isRejected(...[updateUserWorkExperienceAction]), (state) => {
        state.loader = false;
      })
      .addMatcher(isRejected(...[addUserWorkExperienceAction]), (state) => {
        console.log("rejected adding state");
        state.loader = false;
      })
      .addMatcher(isRejected(...[getUserWorkExperience]), (state) => {
        console.log("rejected adding state");
        state.loader = false;
      });
  },
});

export const { handleResetEmergencyInfo } = workExperienceSlice.actions;
export default workExperienceSlice.reducer;
