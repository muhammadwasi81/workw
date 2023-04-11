import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import {
  addEmployeeAction,
  getAllEmployeeAction,
  getEmployeeByIdAction,
  updateEmployeeAction,
  getWorkAction,
  getEducationAction,
  updateUserCoverImgAction,
  updateUserProfileImgAction,
  saveSticyNotes,
  getStickyNotes,
} from "./action";

const initialState = {
  success: false,
  employees: [],
  work: [],
  education: [],
  loadingData: false,
  loader: false,
  coverImg: {},
  profileImg: {},
  profileSticky: { description: "" },
};

const employeeProfileSlice = createSlice({
  name: "Employee",
  initialState,
  reducers: {
    clearEmployeeDetails: (state) => {
      state.employeeDetail = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllEmployeeAction.fulfilled, (state, action) => {
      console.log(action.payload, "getAllEmployee slice");
      state.employees = action.payload ? action.payload : [];
      state.loader = false;
    });
    builder.addCase(getEmployeeByIdAction.fulfilled, (state, action) => {
      state.employees = action.payload.data;
      state.loader = false;
    });
    builder.addCase(addEmployeeAction.fulfilled, (state, { payload }) => {
      state.success = true;
      state.employees = [...state.employees, payload.data.data];
      state.loader = false;
    });
    builder.addCase(getWorkAction.fulfilled, (state, action) => {
      state.work = action.payload.data;
      state.loader = false;
    });
    builder.addCase(getEducationAction.fulfilled, (state, action) => {
      state.education = action.payload.data;
      state.loader = false;
    });
    builder.addCase(updateEmployeeAction.fulfilled, (state, { payload }) => {
      state.success = true;
      state.employees = [...state.employees, payload.data.data];
      state.loader = false;
    });
    builder
      .addCase(updateUserCoverImgAction.fulfilled, (state, { payload }) => {
        state.success = true;
        state.coverImg = payload;
        state.loader = false;
      })
      .addCase(updateUserProfileImgAction.fulfilled, (state, { payload }) => {
        state.success = true;
        state.profileImg = payload;
        state.loader = false;
      })
      .addCase(saveSticyNotes.fulfilled, (state, { payload }) => {
        state.profileSticky = payload.data;
      })
      .addCase(getStickyNotes.fulfilled, (state, { payload }) => {
        if (payload.data.length > 0) {
          state.profileSticky = payload?.data[0];
        } else {
          state.profileSticky = { description: "" };
        }
      })
      .addMatcher(isPending(...[getAllEmployeeAction]), (state) => {
        state.loader = true;
      })
      .addMatcher(isPending(...[getEmployeeByIdAction]), (state) => {
        state.loader = true;
      })
      .addMatcher(isRejected(...[getAllEmployeeAction]), (state) => {
        state.loader = true;
      });
  },
});

export const { clearEmployeeDetails } = employeeProfileSlice.actions;
export default employeeProfileSlice.reducer;
