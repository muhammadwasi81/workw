import { jsonToFormData } from "../../../../utils/base";
import Config from "../../../../utils/services/MasterConfig";
import {
  ResponseResultError,
  ResponseResultSuccess,
} from "../../../../utils/api/ResponseResult";
import { responseCode as responseCodeEnum } from "../../../../services/enums/responseCode";

const career_data = (data) => {
  return {
    pageNo: data.pageNo ? data.pageNo : 1,
    pageSize: data.pageSize ? data.pageSize : 20,
    approverStatus: data.approverStatus ? data.approverStatus : [],
    filterType: data.filterType ? data.filterType : 1,
    sortBy: data.sortBy ? data.sortBy : 1,
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
