import { createAsyncThunk } from '@reduxjs/toolkit';
import { message } from 'antd';
import { responseCode } from '../../../../services/enums/responseCode';
import {
  addEmployeeService,
  getAllEmployeeService,
  getEmployeeByIdService,
  updateEmployeeService,
} from '../service/service';

export const addEmployeeAction = createAsyncThunk(
  `Employee/AddEmployee`,
  async (data, { rejectWithValue }) => {
    const res = await addEmployeeService(data);
    console.log(res.data.message, 'addEmployee actions');
    if (res.data?.responseCode === responseCode.Success) {
      message.success('Employee Created');
      return res;
    } else {
      message.error(res.data.message);
      return rejectWithValue(res.data.message);
    }
  }
);

export const getAllEmployeeAction = createAsyncThunk(
  `Employee/GetAllEmployee`,
  async (data) => {
    const response = await getAllEmployeeService(data);
    console.log(response.data, 'getAllEmployee actions');
    if (!response.responseCode) {
      message.error('Something went wrong');
    }
    return response.data;
  }
);

export const getEmployeeByIdAction = createAsyncThunk(
  `Employee/GetEmployeeById`,
  async (id) => {
    const response = await getEmployeeByIdService(id);
    console.log(response.data, 'getEmployeeById actions');
    return response.data;
  }
);

export const updateEmployeeAction = createAsyncThunk(
  `Employee/UpdateEmployee`,
  async (data, { rejectWithValue }) => {
    const res = await updateEmployeeService(data);
    console.log(res.data.message, 'updateEmployee actions');
    if (res.data?.responseCode === responseCode.Success) {
      message.success('Employee Updated');
      return res;
    } else {
      message.error(res.data.message);
      return rejectWithValue(res.data.message);
    }
  }
);
