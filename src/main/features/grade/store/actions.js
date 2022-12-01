import { createAsyncThunk } from '@reduxjs/toolkit';
import { responseCode } from '../../../../services/enums/responseCode';
import {
  responseMessage,
  responseMessageType,
} from '../../../../services/slices/notificationSlice';
import {
  addGradeService,
  getAllGradesService,
  removeGradeService,
  updateGradeService,
} from '../services/service';
import { message } from 'antd';

export const getAllGrades = createAsyncThunk(
  'grade/getAllGrade',
  async (args, { dispatch }) => {
    const res = await getAllGradesService();
    if (!res.responseCode) {
      responseMessage({
        dispatch: dispatch,
        type: responseMessageType.ApiFailure,
      });
    }
    return res;
  }
);

export const addGrade = createAsyncThunk(
  'grade/addGrade',
  async (args, { dispatch }) => {
    const res = await addGradeService(args);
    console.log(res);
    if (res.responseCode) {
      if (res.responseCode === responseCode.Success)
        res.message = 'Grade added successfully!';
      message.success(res.message);
      responseMessage({ dispatch, data: res });
    } else {
      responseMessage({
        dispatch: dispatch,
        type: responseMessageType.ApiFailure,
      });
    }

    return res;
  }
);

export const updateGrade = createAsyncThunk(
  'grade/updateGrade',
  async (args, { dispatch }) => {
    const res = await updateGradeService(args);
    if (res.responseCode) {
      if (res.responseCode === responseCode.Success)
        res.message = 'Grade updated successfully!';
      message.success(res.message);
      responseMessage({ dispatch, data: res });
    } else {
      responseMessage({
        dispatch: dispatch,
        type: responseMessageType.ApiFailure,
      });
    }

    return res;
  }
);

export const removeGrade = createAsyncThunk(
  'grade/removeGrade',
  async (args, { dispatch }) => {
    const res = await removeGradeService(args.id);

    if (res.responseCode) {
      if (res.responseCode === responseCode.Success)
        res.message = 'Grade removed successfully!';
      message.success(res.message);

      responseMessage({ dispatch, data: res });
    } else {
      responseMessage({
        dispatch: dispatch,
        type: responseMessageType.ApiFailure,
      });
    }

    return res;
  }
);
