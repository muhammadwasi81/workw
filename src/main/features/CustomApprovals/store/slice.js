import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { addCustomApproval, getAllCustomApprovals, GetCustomApprovalById } from "./actions";

const initialState = {
  customApprovals: [],
  loadingData: false,
  loader: true,
  customApprovalDetail: null,
  drawerOpen: false,
};

const customApprovalSlice = createSlice({
  name: "customApprovals",
  initialState,
  reducers: {
    handleOpenComposer: (state, { payload }) => {
      state.drawerOpen = payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllCustomApprovals.fulfilled, (state, action) => {
      state.customApprovals = action.payload ? action.payload : [];
      state.loader = false;
    });

    builder.addCase(GetCustomApprovalById.fulfilled, (state, action) => {
      state.customApprovalDetail = action.payload.data;
    });
    builder.addCase(addCustomApproval.fulfilled, (state, { payload }) => {
      state.leaveData = payload;
      state.drawerOpen = false;
      return state;
    })

    builder
      .addMatcher(isPending(...[getAllCustomApprovals]), (state) => {
        state.loader = true;
      })

      .addMatcher(isRejected(...[getAllCustomApprovals]), (state) => {
        state.loader = true;
      });
  },
});

export const { handleOpenComposer } = customApprovalSlice.actions;
export default customApprovalSlice.reducer;
