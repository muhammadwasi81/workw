import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import {
  getUserEmergency,
  updateUserEmergencyContactAction,
  addUserEmergencyContactAction,
} from "./actions";

const initialState = {
  emergencyDetails: {},
  emergencyInformation: [],
  loader: false,
  success: false,
};

const emergencyInfoSlice = createSlice({
  name: "emergencyInfo",
  initialState,
  reducers: {
    handleResetEmergencyInfo: (state) => {
      state.emergencyDetails = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserEmergency.fulfilled, (state, { payload }) => {
        console.log(payload, "getUserEmergency slice");
        state.emergencyInformation = payload.data;
        state.loader = false;
        state.success = true;
      })
      .addCase(updateUserEmergencyContactAction.fulfilled, (state, action) => {
        console.log(action.payload, "updateUserEmergencyContactAction Slice");
        state.emergencyDetails = action.payload;
        state.loader = false;
        state.success = true;
      })
      .addCase(
        addUserEmergencyContactAction.fulfilled,
        (state, { payload }) => {
          console.log(payload, "add use emergency contact");
          state.emergencyInformation.push(payload[0]);
          state.loader = false;
          state.success = true;
        }
      )
      .addMatcher(
        isPending(...[getUserEmergency, updateUserEmergencyContactAction]),
        (state) => {
          console.log("pending state");
          state.loader = true;
        }
      )
      .addMatcher(isPending(...[addUserEmergencyContactAction]), (state) => {
        console.log("pending adding state");
        state.loader = true;
      })
      .addMatcher(
        isRejected(...[getUserEmergency, updateUserEmergencyContactAction]),
        (state) => {
          console.log("rejected state");
          state.loader = false;
        }
      )
      .addMatcher(isRejected(...[addUserEmergencyContactAction]), (state) => {
        console.log("rejected emergency state");
        state.loader = false;
        state.success = false;
      });
  },
});

export const { handleResetEmergencyInfo } = emergencyInfoSlice.actions;
export default emergencyInfoSlice.reducer;
