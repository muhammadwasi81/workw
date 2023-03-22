import { jsonToFormData } from "../../../../utils/base";
import Config from "../../../../utils/services/MasterConfig";
import {
  ResponseResultError,
  ResponseResultSuccess,
} from "../../../../utils/api/ResponseResult";
import { responseCode as responseCodeEnum } from "../../../../services/enums/responseCode";

export const getAllTaskForAppraisalService = async (payload) => {
  try {
    const {
      data: { responseCode, data, message },
    } = await Config.post(`api/Appraisal/GetAllTasksForAppraisal`, payload);
    if (responseCode === responseCodeEnum.Success)
      return ResponseResultSuccess(data);
    return ResponseResultError(message);
  } catch (e) {
    console.log(e, "erro   data...");

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
    console.log(e, "erro   data...");

    return ResponseResultError(e);
  }
};

export const getAllAppraisalByIdService = async (id) => {
  try {
    const {
      data: { responseCode, data, message },
    } = await Config.get(`api/Appraisal/GetAppraisalById?id=${id}`);
    if (responseCode === responseCodeEnum.Success)
      return ResponseResultSuccess(data);
    return ResponseResultError(message);
  } catch (e) {
    console.log(e, "erro   data...");

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

export const getAllAppraisalByMeService = async (id) => {
  try {
    const {
      data: { responseCode, data, message },
    } = await Config.get(`api/Appraisal/GetAppraisalByMe?id=${id}`);
    if (responseCode === responseCodeEnum.Success)
      return ResponseResultSuccess(data);
    return ResponseResultError(message);
  } catch (e) {
    console.log(e, "erro   data...");

    return ResponseResultError(e);
  }
};

export const getAllPreviousAppraisalService = async (id) => {
  try {
    const {
      data: { responseCode, data, message },
    } = await Config.get(`api/Appraisal/GetAllPreviousAppraisal?id=${id}`);
    if (responseCode === responseCodeEnum.Success)
      return ResponseResultSuccess(data);
    return ResponseResultError(message);
  } catch (e) {
    console.log(e, "erro   data...");

    return ResponseResultError(e);
  }
};
