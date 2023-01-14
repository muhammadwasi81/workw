import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { getBankDetailByUser } from "../../bankDetails/store/actions";
import { getUserBasicInfo } from "../../basicInfo/store/actions";
import { getEducationDetailByUser } from "../../education/store/actions";
import { getUserWorkExperience } from "../../experienceInfo/store/actions";
import { addEmployee, getAllEmployees, getEmployeeByIdAction } from "./actions";

const initialState = {
  employees: [],
  employee: {
    bankdetails: {},
    emergencydetails: [],
    experiencedetails: [],
    educationdetails: [],
    basicdetails: [],
    profileDetails: {},
  },
  loader: false,
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(addEmployee.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.success = true;
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
      .addCase(getBankDetailByUser.fulfilled, (state, { payload }) => {
        state.employee.bankdetails = payload.data;
      })
      .addCase(getUserBasicInfo.fulfilled, (state, { payload }) => {
        state.employee.basicdetails = payload.data;
      })
      .addCase(getUserWorkExperience.fulfilled, (state, { payload }) => {
        state.employee.experiencedetails = payload.data;
      })
      .addCase(getEducationDetailByUser.fulfilled, (state, { payload }) => {
        state.employee.educationdetails = payload.data;
      })
      .addMatcher(isPending(...[addEmployee, getAllEmployees]), (state) => {
        state.loader = true;
        state.success = false;
      })
      .addMatcher(isRejected(...[addEmployee, getAllEmployees]), (state) => {
        state.loader = false;
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
} = employeeSlice.actions;
