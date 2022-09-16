import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import {
  getAllDepartments,
  addDepartment,
  getDepartmentById,
  getAllDepartmentAppraisalQuestion,
  addDepartmentAppraisalQuestion,
  updateDepartmentAppraisalQuestion,
  removeDepartmentAppraisalQuestion,
} from "./actions";

const initialState = {
  departments: [],
  loadingData: false,
  createLoader: false,
  loader: false,
  success: false,
  error: false,
  drawerOpen: false,
  departmentDetail: {},
  appraisalQuestion: [],
};

const departmentSlice = createSlice({
  name: "departments",
  initialState,
  reducers: {
    appraisalQuestionDeleted: (state, { payload }) => {
      // console.log(payload, "********delet reducer");
      state.appraisalQuestion = state.appraisalQuestion.filter(
        (e) => e.id !== payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllDepartments.fulfilled, (state, { payload }) => {
        // console.log(payload);
        state.departments = payload ? payload : [];
        state.loader = false;
      })
      .addCase(addDepartment.fulfilled, (state, { payload }) => {
        // console.log("*****", payload.data);
        if (payload.data.data) {
          // console.log("before adding", state.departments);
          state.departments.unshift(payload.data.data);
          // console.log("after adding", state.departments);
        }
        state.success = true;
      })
      .addCase(getDepartmentById.fulfilled, (state, { payload }) => {
        // console.log("GetDepartmentById payload", payload.data);
        state.departmentDetail = payload.data;
        state.loading = false;
      })
      .addCase(
        updateDepartmentAppraisalQuestion.fulfilled,
        (state, { payload }) => {
          // console.log(payload, "payload of update appraisal question");
          state.loader = false;
          state.appraisalQuestion = state.appraisalQuestion.map((x) =>
            x.id === payload.data.data.id ? payload.data.data : x
          );
        }
      )
      .addCase(
        getAllDepartmentAppraisalQuestion.fulfilled,
        (state, { payload }) => {
          // console.log(payload, "*******");
          if (payload) {
            state.appraisalQuestion = payload;
            state.loading = false;
          }
        }
      )
      .addCase(
        addDepartmentAppraisalQuestion.fulfilled,
        (state, { payload }) => {
          if (payload.data.data) {
            state.appraisalQuestion.unshift(payload.data.data);
          }
          state.success = true;
        }
      )
      .addMatcher(isPending(...[addDepartment]), (state) => {
        // console.log("its pending");
        state.createLoader = true;
      })
      .addMatcher(isPending(...[getAllDepartments]), (state) => {
        // console.log("its pending");
        state.createLoader = true;
      })
      .addMatcher(
        isPending(...[updateDepartmentAppraisalQuestion]),
        (state) => {
          console.log("its pending update");
          state.createLoader = true;
        }
      )

      .addMatcher(isRejected(...[getAllDepartments]), (state) => {
        state.loader = true;
      })
      .addMatcher(isPending(...[addDepartmentAppraisalQuestion]), (state) => {
        console.log("its pending add department appraisa question");
        // state.createLoader = true;
      });
  },
});

export const { appraisalQuestionDeleted } = departmentSlice.actions;
export default departmentSlice.reducer;
