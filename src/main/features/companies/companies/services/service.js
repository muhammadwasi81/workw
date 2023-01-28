// import AxiosConfig from "../../../../utils/services/AxiosConfig";
import {
  ResponseResultError,
  ResponseResultSuccess,
} from "../../../../../utils/api/ResponseResult";
import Config from "../../../../../utils/services/MasterConfig";
import { responseCode as responseCodeEnum } from "../../../../../services/enums/responseCode";

export const getAllTeamsService = async (request) => {
  try {
    const {
      data: { responseCode, data, message },
    } = await Config.get(`api/Business/GetAllBusiness`);

    if (responseCode === responseCodeEnum.Success)
      return ResponseResultSuccess(data);
    return ResponseResultError(message);
  } catch (e) {
    return ResponseResultError(e);
  }
};
export const getAllRewardService = async (id) => {
  console.log(id, "REQUEST");
  try {
    const {
      data: { responseCode, data, message },
    } = await Config.get(`api/Reward/GetRewardUserById?userId=${id}`);
    console.log(responseCode, "response code");

    if (responseCode === responseCodeEnum.Success)
      return ResponseResultSuccess(data);
    return ResponseResultError(message);
  } catch (e) {
    return ResponseResultError(e);
  }
};

export const getAllLoanService = async (id) => {
  // console.log(request, "REQUEST");
  try {
    const {
      data: { responseCode, data, message },
    } = await Config.get(`api/Loan/GetLoanUserById?userId=${id}`);

    if (responseCode === responseCodeEnum.Success)
      return ResponseResultSuccess(data);
    return ResponseResultError(message);
  } catch (e) {
    return ResponseResultError(e);
  }
};

export const getAllComplainService = async (id) => {
  // console.log(request, "REQUEST");
  try {
    const {
      data: { responseCode, data, message },
    } = await Config.get(`api/Complain/GetComplainUserById?userId=${id}`);
    // console.log(responseCode, "REQUEST REWARD RESPONSE");

    if (responseCode === responseCodeEnum.Success)
      return ResponseResultSuccess(data);
    return ResponseResultError(message);
  } catch (e) {
    return ResponseResultError(e);
  }
};
