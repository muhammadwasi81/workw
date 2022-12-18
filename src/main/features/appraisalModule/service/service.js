import { jsonToFormData } from "../../../../utils/base";
import Config from "../../../../utils/services/MasterConfig";
import {
  ResponseResultError,
  ResponseResultSuccess,
} from "../../../../utils/api/ResponseResult";
import { responseCode as responseCodeEnum } from "../../../../services/enums/responseCode";
  




export const getAllTaskForAppraisalService = async (payload) => {
  // let request = career_data(data);

  try {
    const {
      data: { responseCode, data, message },
    } = await Config.post(`api/Appraisal/GetAllTasksForAppraisal`, payload);
    if (responseCode === responseCodeEnum.Success)
      return ResponseResultSuccess(data);
    return ResponseResultError(message);
  } catch (e) {
  console.log(e, 'erro   data...')

    return ResponseResultError(e);
  }
};



export const getAllAppraisalService = async (payload) => {
  try {
    const {
      data: { responseCode, data, message },
    } = await Config.post(`api/Appraisal/GetAllAppraisal`, payload);
    if (responseCode === responseCodeEnum.Success)
      return ResponseResultSuccess(data);
    return ResponseResultError(message);
  } catch (e) {
  console.log(e, 'erro   data...')

    return ResponseResultError(e);
  }
};


export const addAppraisalService = async (payload) => {
  console.log(payload, "add Career data in service");
 
  try {
    const {
      data: { responseCode, data, message },
    } = await Config.post(`api/Appraisal/AddAppraisal`, payload);
    if (responseCode === responseCodeEnum.Success) {
      return ResponseResultSuccess(data);
    }
    return ResponseResultError(message);
  } catch (e) {
    return ResponseResultError(e);
  }
};