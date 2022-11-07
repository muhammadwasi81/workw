import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { addComplain, cancelComplain, getAllComplains, GetComplainById } from "./actions";

const initialState = {
  complains: [],
  loadingData: false,
  loader: true,
  complainDetail: null,
  drawerOpen: false,
  cancelComplain: {}
};

const complainSlice = createSlice({
  name: "complains",
  initialState,
  reducers: {
    handleOpenComposer: (state, { payload }) => {
      state.drawerOpen = payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllComplains.fulfilled, (state, action) => {
      state.complains = action.payload ? action.payload : [];
      state.loader = false;
    });

    builder.addCase(GetComplainById.fulfilled, (state, action) => {
      state.complainDetail = action.payload.data;
    });

    builder.addCase(cancelComplain.fulfilled, (state, action) => {
      state.cancelComplain = action.payload.data;
    });

    builder
      .addCase(addComplain.fulfilled, (state, { payload }) => {
        state.drawerOpen = false;
        state.complains = [payload.data.data, ...state.complains ]
        return state;
      })
      .addMatcher(isPending(...[getAllComplains]), (state) => {
        state.loader = true;
      })
      .addMatcher(isRejected(...[getAllComplains]), (state) => {
        state.loader = true;
      });
  },
});

export const {handleOpenComposer} = complainSlice.actions;
export default complainSlice.reducer;
