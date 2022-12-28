import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  responseMessage,
  responseMessageType,
} from "../../../../../../services/slices/notificationSlice";
import { ResponseType } from "../../../../../../utils/api/ResponseResult";
import { openNotification } from "../../../../../../utils/Shared/store/slice";
import { ValidateAddMultipleSalary } from "../../../utils/validate";
import {
  addEmployeeSalaryService,
  getCurrentSalaryOfEmployeeService,
  getEmployeeSalaryService,
} from "../service/service";

export const getCurrentSalaryOfEmployeeAction = createAsyncThunk(
  `InventoryAsset/GetInventoryAssetById`,
  async (id) => {
    const response = await getCurrentSalaryOfEmployeeService(id);
    console.log(response.data, "getCurrentSalaryOfEmployeeAction actions");
    return response.data;
  }
);

export const addEmployeeSalaryAction = createAsyncThunk(
  "employeeSalary/addEmployee",
  async (payload, { rejectWithValue, dispatch }) => {
    const response = await addEmployeeSalaryService(payload);
    console.log(response, "addEmployeeSalaryAction action");
    switch (response.type) {
      case ResponseType.ERROR:
        dispatch(
          openNotification({
            message: response.errorMessage,
            type: "error",
            duration: 2,
          })
        );
        return rejectWithValue(response.errorMessage);
      case ResponseType.SUCCESS:
        dispatch(
          openNotification({
            message: `Employee Salary Added Successfully`,
            type: "success",
            duration: 2,
          })
        );
        return response.data;
      default:
        return;
    }
  }
);

export const getEmployeeSalaryAction = createAsyncThunk(
  `employeeSlice/GetEmployeeSalary`,
  async (id) => {
    const response = await getEmployeeSalaryService(id);
    console.log(response.data, "getSalaryOfEmployeeAction actions");
    return response.data;
  }
);

// export const addEmployeeSalaryAction = createAsyncThunk(
//   'employeeSalary/addEmployee',
//   async ({ payload }, { rejectWithValue, dispatch }) => {
//     let validatePayload = ValidateAddMultipleSalary(payload);
//     if (validatePayload.error) {
//       responseMessage({
//         dispatch: dispatch,
//         type: responseMessageType.ApiFailure,
//         data: validatePayload,
//       });
//       return rejectWithValue(validatePayload.message);
//     }
//     const response = await addEmployeeSalaryService(payload);
//     console.log(response, 'addEmployeeSalaryAction action');
//     switch (response.type) {
//       case ResponseType.ERROR:
//         responseMessage({
//           dispatch: dispatch,
//           type: responseMessageType.ApiFailure,
//           data: {
//             message: response.errorMessage,
//           },
//         });
//         return rejectWithValue(response.errorMessage);
//       case ResponseType.SUCCESS:
//         dispatch(
//           openNotification({
//             message: 'Salary Create Successfully',
//             type: 'success',
//             duration: 2,
//           })
//         );
//         return response.data;
//       default:
//         return null;
//     }
//   }
// );
