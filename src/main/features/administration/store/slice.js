import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { GetAllWizard } from "./action";

const initialState = {
  currentTab: "businessLogo",
  handleModal: null,
};
const adminstrationSlice = createSlice({
  name: "adminstrationSlice",
  initialState,
  reducers: {
    handleChangeTab: (state, { payload: tab }) => {
      state.currentTab = tab;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(GetAllWizard.fulfilled, (state, action) => {
      console.log(action.payload, "SLICEDATA");
      state.handleModal = action.payload;
    });
  },
});

export const { handleChangeTab } = adminstrationSlice.actions;
export default adminstrationSlice.reducer;
