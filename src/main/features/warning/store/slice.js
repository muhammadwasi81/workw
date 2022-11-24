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
    cancelWarningSuccess: (state, { payload }) => {
      let warningList = [...state.warnings];
      let index = warningList.findIndex(
        (item) => item.id === payload.warningId
      );
      let warning = warningList.filter(
        (item) => item.id === payload.warningId
      )[0];

      warningList[index] = {
        ...warning,
        status: 4,
      };

      state.warnings = warningList;
      state.warningDetail = {
        ...warning,
        status: 4,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllWarnings.fulfilled, (state, action) => {
      state.warnings = action.payload ? action.payload : [];
      state.loader = false;
    });

    builder.addCase(GetWarningById.fulfilled, (state, action) => {
      state.warningDetail = action.payload.data;
      state.loadingData = false;
      console.log(state.warningDetail, "WARNING DETAIL FROM SLICE")
    });
    builder.addCase(GetWarningById.pending, (state, action) => {
      state.loadingData = true;
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
      .addMatcher(isPending(...[GetWarningById]), (state) => {
        state.loadingData = true;
      })
      .addMatcher(isRejected(...[getAllWarnings]), (state) => {
        state.loader = true;
      });
  },
});

export const {
  handleOpenComposer,
  cancelWarningSuccess,
} = warningSlice.actions;
export default warningSlice.reducer;
