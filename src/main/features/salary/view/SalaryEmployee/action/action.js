import { createAsyncThunk } from '@reduxjs/toolkit';
import { ResponseType } from '../../../../../../utils/api/ResponseResult';
import { openNotification } from '../../../../../../utils/Shared/store/slice';
import { addEmployeeSalaryService } from '../service/service';

export const addEmployeeSalaryAction = createAsyncThunk(
  'employeeSalary/addEmployee',
  async (payload, { rejectWithValue, dispatch }) => {
    const response = await addEmployeeSalaryService(payload);
    console.log(response, 'addEmployeeSalaryAction action');
    switch (response.type) {
      case ResponseType.ERROR:
        return rejectWithValue(response.errorMessage);
      case ResponseType.SUCCESS:
        dispatch(
          openNotification({
            message: `Employee Salary Added Successfully`,
            type: 'success',
            duration: 2,
          })
        );
        return response.data;
      default:
        return;
    }
  }
);
