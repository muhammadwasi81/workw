import { createSlice } from "@reduxjs/toolkit";
// import {
//   getAllTableData,
//   setAllTableData,
//   deleteTableDataVal,
//   updateAllTableData,
//   getAllDesignation,
// } from "./Api";

export const resignationSlice = createSlice({
  name: "mail",
  initialState: {
    loading: false,
    tableData: [],
    designation:[],
    errorMessage: "",
    isUpdated: false,
    isDeleted: false,
    isEdited:false,
  },

  reducers: {
    resetState: (state, payload) => {
      state.isUpdated = false;
      state.isDeleted = false;
      state.isEdited=false;
      state.errorMessage = "";
    },
    deleteItemUpdate: (state, payload) => {
    },
  },
  extraReducers: {
    // [getAllTableData.pending]: (state, { payload }) => {
    //   state.loading = true;
    //   state.tableData = [];
    // },
    // [getAllDesignation.fulfilled]: (state, { payload }) => {
    //   state.designation = payload.data;
    // },
  },
});

export const { resetState, deleteItemUpdate } = resignationSlice.actions;
export default resignationSlice.reducer;
