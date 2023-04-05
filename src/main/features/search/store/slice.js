import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { globalSearch } from "../store/actions";
const initialState = {
  keyword: "",
};

const globalSearchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    handleGlobalSearch: (state, { payload }) => {
      console.log(payload, "payloadd searchh");
      state.keyword = payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(globalSearch.fulfilled, (state, { payload }) => {
      state.keyword = payload.data;
    });
  },
});

export const { handleGlobalSearch } = globalSearchSlice.actions;
export default globalSearchSlice.reducer;
