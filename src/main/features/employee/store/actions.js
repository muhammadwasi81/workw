import { createAsyncThunk, isRejectedWithValue } from '@reduxjs/toolkit';
import { responseCode } from '../../../../services/enums/responseCode';
import {
  responseMessage,
  responseMessageType,
} from '../../../../services/slices/notificationSlice';
import { openNotification } from '../../../../utils/Shared/store/slice';
import { updateUserEmployeeContactService } from '../../emergencyInfo/service/service';

import {
  addEmployeeService,
  getAllEmployeesService,
  getEmployeeByIdService,
  updateEmployeeService,
} from '../services/service';

export const addEmployee = createAsyncThunk(
  'addEmployee',
  async ({ data, resetAllFields }, { dispatch, getState, rejectWithValue }) => {
    const res = await addEmployeeService(data);

    if (res?.responseCode === responseCode.Success) {
      dispatch(
        openNotification({
          message: 'Employee Added Successfully',
          type: 'success',
          duration: 2,
        })
      );
      for (let obj in resetAllFields) {
        resetAllFields[obj].resetFields();
      }
      return res;
    } else {
      dispatch(
        openNotification({
          message: res.message,
          type: 'error',
          duration: 2,
        })
      );
      return isRejectedWithValue(res.message);
    }
  }
);

export const getAllEmployees = createAsyncThunk(
  'getAllEmployees',
  async (data, { dispatch, getState, rejectWithValue }) => {
    console.log(data, 'dataaa');
    const res = await getAllEmployeesService(data);
    if (res.responseCode === responseCode.Success) {
      return res;
    } else {
      responseMessage({
        dispatch: dispatch,
        data: res,
        type: responseMessageType.ApiFailure,
      });
      return rejectWithValue(res.message);
    }
  }
);

export const getEmployeeByIdAction = createAsyncThunk(
  'getEmployeeById',
  async (id, { dispatch, rejectWithValue }) => {
    const res = await getEmployeeByIdService(id);
    console.log(res.data, 'getEmployeeByIdAction');
    if (res.responseCode === responseCode.Success) {
      return res;
    } else {
      responseMessage({
        dispatch: dispatch,
        data: res,
        type: responseMessageType.ApiFailure,
      });
      return rejectWithValue(res.message);
    }
  }
);

export const updateEmployeeAction = createAsyncThunk(
  'updateEmployee',
  async ({ data, resetAllFields }, { dispatch, getState, rejectWithValue }) => {
    console.log(data, 'action');
    const res = await updateEmployeeService(data);
    console.log(res, 'updateEmployeeAction');
    if (res.responseCode === responseCode.Success) {
      dispatch(
        openNotification({
          message: 'Employee Updated Successfully',
          type: 'success',
          duration: 2,
        })
      );
      for (let obj in resetAllFields) {
        resetAllFields[obj].resetFields();
      }
      return res;
    } else {
      dispatch(
        openNotification({
          message: res.message,
          type: 'error',
          duration: 2,
        })
      );
      return isRejectedWithValue(res.message);
    }
  }
);
