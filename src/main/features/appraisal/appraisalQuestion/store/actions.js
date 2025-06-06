import { createAsyncThunk } from '@reduxjs/toolkit';
import { message } from 'antd';
import { responseCode } from '../../../../../services/enums/responseCode';
import {
  responseMessage,
  responseMessageType,
} from '../../../../../services/slices/notificationSlice';
import MasterConfig from '../../../../../utils/services/MasterConfig';
import {
  addAppraisalQuestionService,
  getAllAppraisalQuestionService,
} from '../services/service';
import { appraisalQuestionDeleted } from './slice';

export const getAllQuestion = createAsyncThunk(
  'appraisalQuestion/getAllQuestion',
  async (args, { dispatch }) => {
    const res = await getAllAppraisalQuestionService();
    if (!res.responseCode) {
      responseMessage({
        dispatch: dispatch,
        type: responseMessageType.ApiFailure,
      });
    }
    return res;
  }
);

export const addQuestion = createAsyncThunk(
  'appraisalQuestion/addQuestion',
  async (args, { dispatch }) => {
    const res = await addAppraisalQuestionService(args);
    if (res.responseCode && res.responseCode === responseCode.Success) {
      message.success('Appraisal Question added successfully!');
      responseMessage({ dispatch, data: res });
    } else {
      message.error(res.message);
    }
    return res;
  }
);

export const updateQuestion = createAsyncThunk(
  'appraisalQuestion/updateQuestion',
  async (args, { dispatch }) => {
    return await MasterConfig.put(
      `api/appraisal/updatequestion`,
      args
    )
      .then((res) => {
        if (res.data.responseCode === responseCode.Success)
          res.data.message = 'Appraisal Question updated successfully!';
        message.success(res.data.message);
        responseMessage({ dispatch, data: res.data });
        return res.data;
      })
      .catch((err) => {
        responseMessage({
          dispatch: dispatch,
          type: responseMessageType.ApiFailure,
        });
        message.error(err.message);
        return err;
      });
  }
);

export const removeQuestion = createAsyncThunk(
  'appraisalQuestion/removeQuestion',
  async (args, { dispatch, getState }) => {
    return await MasterConfig.delete(
      `api/appraisal/removequestion?id=${args.id}`
    )
      .then((res) => {
        if (res.data.responseCode === responseCode.Success) {
          res.data.message = 'Appraisal removed successfully!';
          message.success(res.data.message);
          dispatch(appraisalQuestionDeleted(args));
        }
        responseMessage({ dispatch, data: res.data });
        return res.data;
      })
      .catch((err) => {
        responseMessage({
          dispatch: dispatch,
          type: responseMessageType.ApiFailure,
        });
        message.error(err.message);
        return err;
      });
  }
);
