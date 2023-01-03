import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";

const initialState = {
  currentTab: "businessLogo",
};
const adminstrationSlice = createSlice({
  name: "careers",
  initialState,
  reducers: {
    handleChangeTab: (state, { payload: tab }) => {
      state.currentTab = tab;
    },
  },
});

export const { handleChangeTab } = adminstrationSlice.actions;
export default adminstrationSlice.reducer;
