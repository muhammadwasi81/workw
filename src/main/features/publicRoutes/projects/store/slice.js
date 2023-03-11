import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { GetReferenceById, addAppointmentByExternal } from "./action";

const initialState = {
  referenceDetail: null,
  loadingData: false,
  loader: true,
};

const externalBookAppointment = createSlice({
  name: "externalBookAppointment",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(GetReferenceById.fulfilled, (state, action) => {
        console.log(action.payload, "slice data");
        state.referenceDetail = action.payload.data;
        state.loader = false;
      })
      .addCase(addAppointmentByExternal.fulfilled, (state, action) => {
        console.log("sent data succsess");
      })
      .addMatcher(isPending(...[GetReferenceById]), (state) => {
        state.loader = true;
      });
  },
});

export default externalBookAppointment.reducer;
