import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { globalSearch } from "../store/actions";
const initialState = {
  keyword: "",
  tab:"All"
};

const globalSearchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    handleGlobalSearch: (state, { payload }) => {
      console.log(payload, "payloadd searchh");
      state.keyword = payload;
    },
    handleTab: (state,{payload}) =>{
      console.log(payload, "payload Tab");
      state.tab = payload;
    }
  },


  extraReducers: (builder) => {
    builder.addCase(globalSearch.fulfilled, (state, { payload }) => {
      state.keyword = payload.data;
    });
  },
});

export const { handleGlobalSearch ,handleTab } = globalSearchSlice.actions;
export default globalSearchSlice.reducer;
