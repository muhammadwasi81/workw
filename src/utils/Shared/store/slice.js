import { createSlice, isPending, isRejected } from '@reduxjs/toolkit';
import {
  getEmployeeSalary,
  getCities,
  getCountries,
  getAllDefaultDesignation,
  getAllUserTypes,
  getAllUserTitles,
  getAllGenders,
  getAllMaritalStatus,
  uploadImage,
  getRewardCategory,
  getAllBussinessFeatures,
  getAllEmployeeTypes,
  getComplainCategory,
  getAllEmployees,
  getAllEmployeeShort,
  disableEmployee,
} from './actions';

const initialState = {
  countries: [],
  cities: [],
  designations: [],
  employeeSalary: '',
  employeeBasicSalary: '',
  userTypes: [],
  userTitles: [],
  genders: [],
  maritalStatus: [],
  isUploaded: false,
  imageIds: [],
  rewardCategories: [],
  complainCategories: [],
  loadingData: false,
  loader: false,
  success: false,
  bussinessFeatures: [],
  employeeTypes: [],
  notification: {},
  employees: [],
  employeeShort: [],
  isDarkMode: localStorage.getItem('darkMode') === '1',
  itemDetailModal: false,
};

const sharedSlice = createSlice({
  name: 'shared',
  initialState,
  reducers: {
    openNotification: (state, { payload }) => {
      state.notification = payload;
    },
    emptyEmployeesData: (state, { payload }) => {
      state.employees = [];
    },
    darkModeHandler: (state, { payload }) => {
      state.isDarkMode = payload;
    },
    handleItemDetailModal: (state, { payload }) => {
      console.log(payload, 'payload');
      state.itemDetailModal = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCountries.fulfilled, (state, { payload }) => {
        state.countries = payload.data;
        state.loadingData = false;
      })
      .addCase(getEmployeeSalary.fulfilled, (state, { payload }) => {
        state.employeeSalary = payload.data;
        // let x = payload.data.map((element, i) => {
        //   return element.netSalary;
        // });
        // console.log(payload, "payload of salary");
        // let data = x.length > 0 ? x[0] : "";
        // state.employeeSalary = data;
        // state.loadingData = false;
      })
      .addCase(getAllEmployees.fulfilled, (state, { payload }) => {
        state.employees = payload.data;
        state.loader = false;
        state.success = true;
      })
      .addCase(getAllEmployeeShort.fulfilled, (state, { payload }) => {
        state.employeeShort = payload.data;
        state.loadingData = false;
        state.loader = false;
      })
      .addCase(getCities.fulfilled, (state, { payload }) => {
        // console.log("city payload data", payload.data);
        state.cities = payload.data;
        state.loadingData = false;
        state.loader = false;
        state.success = true;
      })
      .addCase(getAllDefaultDesignation.fulfilled, (state, { payload }) => {
        state.designations = payload.data;
        state.loadingData = false;
      })
      .addCase(getRewardCategory.fulfilled, (state, { payload }) => {
        state.rewardCategories = payload;
        state.loadingData = false;
      })
      .addCase(getComplainCategory.fulfilled, (state, { payload }) => {
        state.complainCategories = payload;
        state.loadingData = false;
      })
      .addCase(uploadImage.fulfilled, (state, { payload }) => {
        state.imageIds.push(payload.data[0].id);
        state.isUploaded = true;
        state.loader = false;
      })
      .addCase(getAllUserTypes.fulfilled, (state, { payload }) => {
        state.userTypes = payload.data;
        state.loadingData = false;
      })
      .addCase(getAllUserTitles.fulfilled, (state, { payload }) => {
        state.userTitles = payload.data;
        state.loadingData = false;
      })
      .addCase(getAllGenders.fulfilled, (state, { payload }) => {
        state.genders = payload.data;
        state.loadingData = false;
      })
      .addCase(getAllMaritalStatus.fulfilled, (state, { payload }) => {
        state.maritalStatus = payload.data;
        state.loadingData = false;
      })
      .addCase(getAllBussinessFeatures.fulfilled, (state, { payload }) => {
        state.bussinessFeatures = payload.data;
        state.loader = false;
      })
      .addCase(getAllEmployeeTypes.fulfilled, (state, { payload }) => {
        state.employeeTypes = payload.data;
        state.loader = false;
      })
      .addCase(disableEmployee.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.success = true;
      })
      .addMatcher(isPending(uploadImage), (state) => {
        state.isUploaded = false;
      })
      .addMatcher(
        isPending(
          ...[
            getAllGenders,
            getAllMaritalStatus,
            getCountries,
            getAllDefaultDesignation,
            getAllUserTitles,
            getAllUserTypes,
            getAllEmployeeTypes,
            getAllEmployees,
            getAllEmployeeShort,
          ]
        ),
        (state) => {
          state.loader = true;
          state.success = false;
        }
      )
      .addMatcher(isPending(getCities), (state) => {
        state.loadingData = true;
        state.success = false;
      })
      .addMatcher(isRejected(), (state) => {
        state.loader = false;
        state.loadingData = false;
        state.isUploaded = false;
        state.success = false;
      });
  },
});
export const {
  openNotification,
  emptyEmployeesData,
  darkModeHandler,
  handleItemDetailModal,
} = sharedSlice.actions;
export default sharedSlice.reducer;
