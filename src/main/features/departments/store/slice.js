import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import {
  getAllDepartments,
  addDepartment,
  getDepartmentById,
  getAllDepartmentAppraisalQuestion,
  addDepartmentAppraisalQuestion,
  updateDepartmentAppraisalQuestion,
  removeDepartmentAppraisalQuestion,
  addDepartmentMemberAction,
  getDepartmentMemberAction,
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
  addMemberModal: false,
  departmentMembers: [],
};

const departmentSlice = createSlice({
  name: "departments",
  initialState,
  reducers: {
    addMember: (state, { payload }) => {
      state.addMemberModal = payload;
    },
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
    addDepartmentMember: (state, { payload }) => {
      //TODO: replace the response with existing id object
      const newDepartMember = state.departments.map((item, i) => {
        if (item.id === payload[0].departmentId) {
          let members = [...item.members, payload[0]];
          let newItem = {
            ...item,
            members,
          };
          return newItem;
        } else {
          return item;
        }
      });

      state.departments = newDepartMember;
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
        console.log("GetDepartmentById payload", payload.data);
        state.departmentDetail = payload.data;
        state.loader = false;
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
      .addCase(addDepartmentMemberAction.fulfilled, (state, { payload }) => {
        if (state.departmentDetail) {
          //TODO: check if response is empty
          if (payload.data?.length) {
            let newMembers = [
              ...state.departmentDetail.members,
              payload.data[0],
            ];
            state.departmentDetail = {
              ...state.departmentDetail,
              members: newMembers,
            };
          }
        }
      })

      .addCase(getDepartmentMemberAction.fulfilled, (state, { payload }) => {
        state.departmentMembers = payload.length > 0 ? payload : [];
      })
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
  addMember,
  addDepartmentMember,
} = departmentSlice.actions;
export default departmentSlice.reducer;
