import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { addWarning, getAllWarnings, GetWarningById } from "./actions";

const initialState = {
  warnings: [],
  loadingData: false,
  loader: true,
  warningDetail: null,
  drawerOpen: false,
};

const warningSlice = createSlice({
  name: "warnings",
  initialState,
  reducers: {
    handleOpenComposer: (state, { payload }) => {
      state.drawerOpen = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllWarnings.fulfilled, (state, action) => {
      state.warnings = action.payload ? action.payload : [];
      state.loader = false;
    });

    builder.addCase(GetWarningById.fulfilled, (state, action) => {
      console.log("action.payload", action.payload);
      state.warningDetail = action.payload.data;
    });

    builder
      .addCase(addWarning.fulfilled, (state, { payload }) => {
        state.warnings = [payload.data.data, ...state.warnings];
        state.drawerOpen = false;
        return state;
      })
      .addMatcher(isPending(...[getAllWarnings]), (state) => {
        state.loader = true;
      })
      .addMatcher(isRejected(...[getAllWarnings]), (state) => {
        state.loader = true;
      });
  },
});

export const { handleOpenComposer } = warningSlice.actions;
export default warningSlice.reducer;
