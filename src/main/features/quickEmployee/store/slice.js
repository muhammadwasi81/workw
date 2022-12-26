import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { addQuickEmployee } from "./action";

const initialState = {
  items: [],
  isOpen: false,
  success: false,
  loader: false,
  editData: null,
};

const quickAddSlice = createSlice({
  name: "quickAdd",
  initialState,
  reducers: {
    quickAddOpen: (state) => {
      state.isOpen = true;
    },
    quickAddClose: (state) => {
      state.isOpen = false;
    },
    addInList: (state, { payload }) => {
      state.items = [...state.items, payload];
    },
    deleteItem: (state, { payload }) => {
      let index = payload;
      state.items = state.items.filter((e, ind) => ind !== index);
      state.editData = null;
    },
    clearItem: (state) => {
      state.items = [];
    },
    editItem: (state, { payload }) => {
      state.editData = payload;
    },
    handleSave: (state, { payload }) => {
      let newPayload = { ...payload };
      delete newPayload["index"];
      console.log(newPayload, payload);
      state.editData = null;
      state.items.splice(payload.index, 1, newPayload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addQuickEmployee.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.success = true;
      })
      .addMatcher(isPending(...[addQuickEmployee]), (state) => {
        state.loader = true;
        state.success = false;
      })
      .addMatcher(isRejected(...[addQuickEmployee]), (state) => {
        state.loader = false;
        state.success = false;
      });
  },
});

export const {
  quickAddOpen,
  quickAddClose,
  addInList,
  deleteItem,
  editItem,
  handleSave,
  clearItem,
} = quickAddSlice.actions;
export default quickAddSlice.reducer;
