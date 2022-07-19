import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { getAllCustomApprovals, GetCustomApprovalById } from "./actions";

const initialState = {
  customApprovals: [],
  loadingData: false,
  loader: true,
  customApprovalDetail: null,
};

const customApprovalSlice = createSlice({
  name: "customApprovals",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCustomApprovals.fulfilled, (state, action) => {
      state.customApprovals = action.payload ? action.payload : [];
      state.loader = false;
    });

    builder.addCase(GetCustomApprovalById.fulfilled, (state, action) => {
      state.customApprovalDetail = action.payload.data;
    });

    builder
      .addMatcher(isPending(...[getAllCustomApprovals]), (state) => {
        state.loader = true;
      })

      .addMatcher(isRejected(...[getAllCustomApprovals]), (state) => {
        state.loader = true;
      });
  },
});

export const {} = customApprovalSlice.actions;
export default customApprovalSlice.reducer;
