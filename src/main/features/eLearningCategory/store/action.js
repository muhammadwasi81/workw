import { createAsyncThunk } from '@reduxjs/toolkit';
import { responseCode } from '../../../../services/enums/responseCode';
import {
  responseMessage,
  responseMessageType,
} from '../../../../services/slices/notificationSlice';
import {
    getELearningCategoryService,
    addELearningCategoryService,
    updateELearningCategoryService,
    removeELearningCategoryService,
} from "../services/service";
import { message } from 'antd';

export const getELearningCategory = createAsyncThunk(
  'ELearningCategorys/getELearningCategory',
  async (args, { dispatch }) => {
    const res = await getELearningCategoryService();
    if (!res.responseCode) {
      responseMessage({
        dispatch: dispatch,
        type: responseMessageType.ApiFailure,
      });
    }
    return res;
  }
);

export const addELearningCategory = createAsyncThunk(
  'ELearningCategorys/addELearningCategory',
  async (args, { dispatch }) => {
    const res = await addELearningCategoryService(args);
    console.log(res,"elearningcategoryyyyyyyy");
    if (res.responseCode) {
      if (res.responseCode === responseCode.Success)
        res.message = 'addELearningCategory added successfully!';
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

export const updateELearningCategory = createAsyncThunk(
  'ELearningCategorys/updateELearningCategory',
  async (args, { dispatch }) => {
    const res = await updateELearningCategoryService(args);
    if (res.responseCode) {
      if (res.responseCode === responseCode.Success)
        res.message = 'ELearningCategory updated successfully!';
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

export const removeELearningCategory = createAsyncThunk(
  'ELearningCategorys/removeELearningCategory',
  async (args, { dispatch }) => {
    const res = await removeELearningCategoryService(args.id);

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
