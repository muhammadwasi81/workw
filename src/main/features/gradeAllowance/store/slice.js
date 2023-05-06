import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { responseCode } from "../../../../services/enums/responseCode.js";
import {
  getGreadeAllowance,
  getGreadeData,
  addGradeAllowance,
  getAllAllowanceGreadeData,
} from "./action";

const initialState = {
  allowances: [],
  gradeAllowances: [],
  gradesData: [],
  loadingData: false,
  loader: false,
  success: false,
  error: false,
  defaultInputValue: {},
  handleUpdate: true,
};

const AllGreadeAllowance = createSlice({
  name: "AllGreadeAllowance",
  initialState,
  reducers: {
    updateInput: (state, action) => {
      state.defaultInputValue = action.payload;
    },
    removeUpdateInput: (state) => {
      state.defaultInputValue = {};
    },

    handleUpdateButton: (state) => {
      state.handleUpdate = false;
    },
    handleAddButton: (state) => {
      state.handleUpdate = true;
    },
    updateUser: (state, action) => {
      const {
        id,

        gradeId,
        description,
        allowanceUnit,
        allowanceId,
        value,
        allowanceName,
        gradeName,
      } = action.payload;
      console.log(action.payload, "vvvvvvvvv");
      const user = state.gradeAllowances.find((grade) => grade.id === id);
      if (user) {
        user.gradeId = gradeId;
        user.description = description;
        user.allowanceUnit = allowanceUnit;
        user.value = value;
        user.allowanceId = allowanceId;
        user.allowanceName = allowanceName;
        user.gradeName = gradeName;
      }
    },
    addSliceGradeAllowance: (state, action) => {
      state.gradeAllowances.push(action.payload);
      console.log(state.gradeAllowances, "sateee");
    },
    deleteSliceGradeAllowance: (state, action) => {
      console.log("payload", action.payload.id);
      state.gradeAllowances = state.gradeAllowances.filter(
        (grade) => grade.id !== action.payload.id
      );
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getGreadeAllowance.fulfilled, (state, { payload }) => {
      state.loadingData = false;
      state.allowances = payload.data;
    });
    builder.addCase(getGreadeData.fulfilled, (state, { payload }) => {
      state.loadingData = false;
      state.gradesData = payload.data;
    });
    builder.addCase(addGradeAllowance.fulfilled, (state, { payload }) => {
      if (payload.responseCode === responseCode.Success) state.loader = false;
    });
    builder.addCase(addGradeAllowance.pending, (state, { payload }) => {
      state.loader = true;
    });
    builder.addCase(
      getAllAllowanceGreadeData.fulfilled,
      (state, { payload }) => {
        state.loadingData = false;
        state.gradeAllowances = payload.data;
      }
    );
  },
});
export const {
  updateInput,
  removeUpdateInput,
  handleUpdateButton,
  handleAddButton,
  updateUser,
  addSliceGradeAllowance,
  deleteSliceGradeAllowance,
} = AllGreadeAllowance.actions;
export default AllGreadeAllowance.reducer;
