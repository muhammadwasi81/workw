import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { getBankDetailByUser } from "../../bankDetails/store/actions";
import { getUserBasicInfo } from "../../basicInfo/store/actions";
import { getUserDeviceInfoAction } from "../../devices/store/action";
import { getEducationDetailByUser } from "../../education/store/actions";
import { getUserWorkExperience } from "../../experienceInfo/store/actions";
import {
  addEmployee,
  getAllEmployees,
  getEmployeeByIdAction,
  addEmployeeFamily,
  getAllEmployeeFamilyAction,
  // removeEmployeeFamily,
  updateEmployeeFamily,
  addEmployeeDetailAttachment,
  getAllEmployeeDetailAttachment,
  // removeEmployeeDetailAttachment,
} from "./actions";

const initialState = {
  employees: [],
  employee: {
    bankdetails: {},
    emergencydetails: [],
    experiencedetails: [],
    educationdetails: [],
    basicdetails: [],
    devicedetails: [],
    profileDetails: {},
    family: [],
    attachments: [],
  },
  loader: false,
  addFamilyLoader: false,
  attachmentLoader: false,
  updateFamilyLoader: false,
  success: false,
};

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    resetBankDetails: (state) => {
      state.employee.bankdetails = [];
    },
    resetEmergencydetails: (state) => {
      state.employee.emergencydetails = [];
    },
    resetExperiencedetails: (state) => {
      state.employee.experiencedetails = [];
    },
    resetEducationdetails: (state) => {
      state.employee.educationdetails = [];
    },
    resetBasicdetails: (state) => {
      state.employee.basicdetails = [];
    },
    removeFamilyMember: (state, { payload }) => {
      console.log(payload);
      state.employee.family = state.employee.family.filter(
        (item) => payload !== item.id
      );
    },
    deleteEmployeeAttachment: (state, { payload }) => {
      console.log(payload);
      state.employee.attachments = state.employee.attachments.filter(
        (item) => payload !== item.id
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addEmployee.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.success = true;
      })
      .addCase(addEmployeeFamily.fulfilled, (state, { payload }) => {
        state.addFamilyLoader = false;
        state.success = true;
        console.log(payload);
        state.employee.family = [...state.employee.family, payload.data];
      })
      .addCase(addEmployeeDetailAttachment.fulfilled, (state, { payload }) => {
        state.attachmentLoader = false;
        state.success = true;
        console.log(payload);
        state.employee.attachments = [
          ...state.employee.attachments,
          payload.data,
        ];
      })
      .addCase(updateEmployeeFamily.fulfilled, (state, { payload }) => {
        state.updateFamilyLoader = false;
        state.success = true;
        console.log(payload);
        //TODO: replace the response with existing id object
        const index = state.employee.family.map((item, i) => {
          if (item.id === payload.id) {
            return i;
          }
        });
        state.employee.family.splice(index, 1, payload.data);
        // state.employee.family = [...state.employee.family, payload.data];
      })
      .addCase(getAllEmployeeFamilyAction.fulfilled, (state, { payload }) => {
        console.log(payload);
        state.employee.family = payload.data;
      })
      .addCase(getAllEmployees.fulfilled, (state, { payload }) => {
        state.employees = payload.data;
        state.loader = false;
        state.success = true;
      })
      .addCase(getEmployeeByIdAction.fulfilled, (state, action) => {
        state.employee.profileDetails = action.payload.data;
        console.log(action.payload.data, "profileDetails slice");
        state.loader = false;
        state.success = true;
      })
      .addCase(getAllEmployeeDetailAttachment.fulfilled, (state, action) => {
        state.employee.attachments = action.payload.data;
        console.log(action.payload.data, "profileDetails slice");
        state.loader = false;
        state.success = true;
      })
      .addCase(getBankDetailByUser.fulfilled, (state, { payload }) => {
        state.employee.bankdetails = payload.data;
      })
      .addCase(getUserBasicInfo.fulfilled, (state, { payload }) => {
        state.employee.basicdetails = payload.data;
      })
      .addCase(getUserDeviceInfoAction.fulfilled, (state, { payload }) => {
        console.log(payload.data, "getUserDeviceInfo");
        state.employee.deviceDetails = payload.data;
      })
      .addCase(getUserWorkExperience.fulfilled, (state, { payload }) => {
        state.employee.experiencedetails = payload.data;
      })
      .addCase(getEducationDetailByUser.fulfilled, (state, { payload }) => {
        state.employee.educationdetails = payload.data;
      })
      .addMatcher(
        isPending(
          ...[
            addEmployee,
            getAllEmployees,
            getAllEmployeeFamilyAction,
            getAllEmployeeDetailAttachment,
          ]
        ),
        (state) => {
          state.loader = true;
          state.success = false;
        }
      )
      .addMatcher(isPending(...[addEmployeeFamily]), (state) => {
        state.addFamilyLoader = true;
        state.success = false;
      })
      .addMatcher(isPending(...[addEmployeeDetailAttachment]), (state) => {
        state.attachmentLoader = true;
        state.success = false;
      })
      .addMatcher(isPending(...[updateEmployeeFamily]), (state) => {
        state.updateFamilyLoader = true;
        state.success = false;
      })
      .addMatcher(
        isRejected(
          ...[
            addEmployee,
            getAllEmployees,
            addEmployeeFamily,
            getAllEmployeeFamilyAction,
            updateEmployeeFamily,
            getAllEmployeeDetailAttachment,
          ]
        ),
        (state) => {
          state.loader = false;
          state.success = false;
        }
      )
      .addMatcher(isRejected(...[addEmployeeFamily]), (state) => {
        state.addFamilyLoader = false;
        state.success = false;
      })
      .addMatcher(isRejected(...[addEmployeeDetailAttachment]), (state) => {
        state.attachmentLoader = false;
        state.success = false;
      })
      .addMatcher(isRejected(...[updateEmployeeFamily]), (state) => {
        state.updateFamilyLoader = false;
        state.success = false;
      });
  },
});
export default employeeSlice.reducer;
export const {
  resetBankDetails,
  resetEducationdetails,
  resetExperiencedetails,
  resetBasicdetails,
  resetEmergencydetails,
  removeFamilyMember,
  deleteEmployeeAttachment,
} = employeeSlice.actions;
