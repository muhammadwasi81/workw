import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { addQuickEmployee } from "./action";

const initialState = {
  items: [],
  isOpen: false,
  success: false,
  loader: false,
  editData: null
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
      let index = payload
      state.items = state.items.filter((e, ind) => ind !== index); 
    },
    editItem: (state, { payload }) => {
      state.editData = payload
    },
    handleSave: (state, { payload }) => {
      console.log(payload, "FROM SAVE FUNCTION")
			state.editData = null
      state.items.splice(payload.index, 1, payload)
      // state.items = state.items.filter((e, ind) => ind === payload.index); 
		}
  },
  extraReducers: (builder) => {
    builder
      .addCase(addQuickEmployee.fulfilled, (state, { payload }) => {
        state.loader = false;
      })
      .addMatcher(isPending(...[addQuickEmployee]), (state) => {
        state.loader = true;
        state.success = true
      })
      .addMatcher(
        isRejected(...[addQuickEmployee]),
        (state) => {
          state.loader = false;
          state.success = false
        }
      );
  },
});

export const { quickAddOpen, quickAddClose, addInList, deleteItem, editItem, handleSave } = quickAddSlice.actions;
export default quickAddSlice.reducer;
