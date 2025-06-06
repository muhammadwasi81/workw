import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  responseMessage,
  responseMessageType,
} from '../../../../services/slices/notificationSlice';
import { ResponseType } from '../../../../utils/api/ResponseResult';
import { openNotification } from '../../../../utils/Shared/store/slice';
import {
  addMultipleEmployeeSalaryService,
  getAllEmployeeSalaryService,
  getEmployeeSalaryDetailService,
} from '../services/service';
import { ValidateAddMultipleSalary } from '../utils/validate';

export const addMultipleEmployeeSalary = createAsyncThunk(
  'EmployeeSalary/addMultipleEmployeeSalary',
  async ({ navigate, salaries }, { rejectWithValue, dispatch }) => {
    let validatePayload = ValidateAddMultipleSalary(salaries);
    if (validatePayload.error) {
      responseMessage({
        dispatch: dispatch,
        type: responseMessageType.ApiFailure,
        data: validatePayload,
      });
      return rejectWithValue(validatePayload.message);
    }

    const response = await addMultipleEmployeeSalaryService(salaries);
    switch (response.type) {
      case ResponseType.ERROR:
        responseMessage({
          dispatch: dispatch,
          type: responseMessageType.ApiFailure,
          data: {
            message: response.errorMessage,
          },
        });
        return rejectWithValue(response.errorMessage);
      case ResponseType.SUCCESS:
        dispatch(
          openNotification({
            message: 'Salary Create Successfully',
            type: 'success',
            duration: 2,
          })
        );
        navigate('/salary');
        return response.data;
      default:
        return null;
    }
  }
);
export const getEmployeeSalaryDetail = createAsyncThunk(
  'EmployeeSalary/getEmployeeSalaryDetail',
  async (id, { rejectWithValue, dispatch }) => {
    const response = await getEmployeeSalaryDetailService(id);
    switch (response.type) {
      case ResponseType.ERROR:
        responseMessage({
          dispatch: dispatch,
          type: responseMessageType.ApiFailure,
          data: {
            message: response.errorMessage,
          },
        });
        return rejectWithValue(response.errorMessage);
      case ResponseType.SUCCESS:
        return response.data;
      default:
        return;
    }
  }
);

export const getAllEmployeeSalary = createAsyncThunk(
  'EmployeeSalary/getAllEmployeeSalary',
  async (data, { rejectWithValue, dispatch }) => {
    const response = await getAllEmployeeSalaryService(data);
    switch (response.type) {
      case ResponseType.ERROR:
        responseMessage({
          dispatch: dispatch,
          type: responseMessageType.ApiFailure,
          data: {
            message: response.errorMessage,
          },
        });
        return rejectWithValue(response.errorMessage);
      case ResponseType.SUCCESS:
        return response;
      default:
        return;
    }
  }
);
