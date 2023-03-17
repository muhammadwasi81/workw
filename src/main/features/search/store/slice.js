import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { globalSearch } from "../store/actions";
const initialState = {};

const globalSearchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(globalSearch.fulfilled, (state, { payload }) => {
      console.log(payload, "payloadd");
    });
  },
});

export const {} = globalSearchSlice.actions;
export default globalSearchSlice.reducer;
