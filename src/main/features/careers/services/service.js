import { jsonToFormData } from "../../../../utils/base";
import Config from "../../../../utils/services/MasterConfig";
import {
  ResponseResultError,
  ResponseResultSuccess,
} from "../../../../utils/api/ResponseResult";
import { responseCode as responseCodeEnum } from "../../../../services/enums/responseCode";

const career_data = (data) => {
  console.log(data);
  return {
    pageNo: data.request.pageNo ? data.request.pageNo : 1,
    pageSize: data.request.pageSize ? data.request.pageSize : 20,
    approverStatus: data.approverStatus ? data.approverStatus : [],
    filterType: data.request.filterType ? data.request.filterType : 0,
    sortBy: data.request.sortBy ? data.request.sortBy : 2,
    search: data.request.search ? data.request.search : "",
  };
};
export const addCareerService = async (data) => {
  console.log(data, "data in service");
  const formData = jsonToFormData(data);
  try {
    const {
      data: { responseCode, data, message },
    } = await Config.post(`api/Career/AddCareer`, formData);
    if (responseCode === responseCodeEnum.Success) {
      return ResponseResultSuccess(data);
    }
    return ResponseResultError(message);
  } catch (e) {
    return ResponseResultError(e);
  }
};

export const addCareerApplicantService = async (data) => {
  console.log(data, "add Career data in service");
  const formData = jsonToFormData(data);
  try {
    const {
      data: { responseCode, data, message },
    } = await Config.post(`api/Career/AddCareerApplicant`, formData);
    if (responseCode === responseCodeEnum.Success) {
      return ResponseResultSuccess(data);
    }
    return ResponseResultError(message);
  } catch (e) {
    return ResponseResultError(e);
  }
};

export const getAllCareerService = async (data) => {
  let request = career_data(data);

  try {
    const {
      data: { responseCode, data, message },
    } = await Config.post(`api/Career/GetAllCareer`, request);
    if (responseCode === responseCodeEnum.Success)
      return ResponseResultSuccess(data);
    return ResponseResultError(message);
  } catch (e) {
    return ResponseResultError(e);
  }
};

export const getAllCareerApplicantService = async (daa) => {
  console.log(daa, "data in get all career applicants");
  const payload = {
    pageSize: 50,
    careerIds: daa.request.careerIds,
  };
  try {
    const {
      data: { responseCode, data, message },
    } = await Config.post(`api/Career/GetAllCareerApplicant`, payload);
    if (responseCode === responseCodeEnum.Success)
      return ResponseResultSuccess(data);
    return ResponseResultError(message);
  } catch (e) {
    return ResponseResultError(e);
  }
};

export const getAllCareerBYIdService = async (id) => {
  try {
    const {
      data: { responseCode, data, message },
    } = await Config.get(`api/Career/GetCareerById?id=${id}`);
    console.log("data by id", data, id);

    if (responseCode === responseCodeEnum.Success)
      return ResponseResultSuccess(data);
    return ResponseResultError(message);
  } catch (e) {
    return ResponseResultError(e);
  }
};
