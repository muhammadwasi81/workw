import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";

import { GetReferenceById, addAppointmentByExternal } from "./action";

const initialState = {
  referenceDetail: null,
  loadingData: false,
  loader: false,
  modal: false,
};

const externalBookAppointment = createSlice({
  name: "externalBookAppointment",
  initialState,
  reducers: {
    setmodal: (state, action) => {
      state.modal = action.payload;
    },
    closeModal: (state, action) => {
      state.modal = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetReferenceById.fulfilled, (state, action) => {
        console.log(action.payload, "action paylod");
        state.referenceDetail = action.payload.data;
        state.loader = false;
      })
      .addCase(addAppointmentByExternal.fulfilled, (state, { payload }) => {
        state.loader = false;
      })

      .addCase(addAppointmentByExternal.rejected, (state, action) => {
        state.loader = false;
      })
      .addMatcher(isPending(...[addAppointmentByExternal]), (state) => {
        state.loader = true;
      })
      .addMatcher(isPending(...[GetReferenceById]), (state) => {
        state.loader = true;
      })
      .addMatcher(isRejected(...[addAppointmentByExternal]), (state) => {
        state.loader = false;
      });
  },
});
export const { setmodal, closeModal } = externalBookAppointment.actions;

export default externalBookAppointment.reducer;
