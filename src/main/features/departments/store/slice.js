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
  isCreateComposer: false,
  loader: false,
  success: false,
  error: false,
  drawerOpen: false,
  parentId: null,
  departmentDetail: {},
  appraisalQuestion: [],
};

const departmentSlice = createSlice({
  name: "departments",
  initialState,
  reducers: {
    appraisalQuestionDeleted: (state, { payload }) => {
      state.appraisalQuestion = state.appraisalQuestion.filter(
        (e) => e.id !== payload
      );
    },
    toggleCreateComposer: (state, { payload }) => {
      state.isCreateComposer = payload;
    },
    handleParentId: (state, { payload }) => {
      state.parentId = payload;
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
        console.log(payload);
        // console.log("*****", payload.data);
        if (payload.data.data) {
          // console.log("before adding", state.departments);
          state.departments.unshift(payload.data.data);
          // console.log("after adding", state.departments);
        }
        state.success = true;
        state.createLoader = false;
        state.isCreateComposer = false;
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
        state.success = false;
        state.createLoader = true;
        state.isCreateComposer = true;
      })
      .addMatcher(isPending(...[getAllDepartments]), (state) => {
        // console.log("its pending");
        state.loader = true;
      })
      .addMatcher(isPending(...[getDepartmentById]), (state) => {
        // console.log("its pending");
        state.loader = true;
      })
      .addMatcher(
        isPending(...[updateDepartmentAppraisalQuestion]),
        (state) => {
          console.log("its pending update");
          state.createLoader = true;
        }
      )
      .addMatcher(isRejected(...[addDepartment]), (state) => {
        state.createLoader = false;
      })
      .addMatcher(isRejected(...[getAllDepartments]), (state) => {
        state.loader = false;
      })
      .addMatcher(isRejected(...[getDepartmentById]), (state) => {
        state.loader = false;
      })
      .addMatcher(isPending(...[addDepartmentAppraisalQuestion]), (state) => {
        console.log("its pending add department appraisa question");
        // state.createLoader = true;
      });
  },
});

export const {
  appraisalQuestionDeleted,
  toggleCreateComposer,
  handleParentId,
} = departmentSlice.actions;
export default departmentSlice.reducer;
