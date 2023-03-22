// import AxiosConfig from "../../../../utils/services/AxiosConfig";
import {
  ResponseResultError,
  ResponseResultSuccess,
} from "../../../../../utils/api/ResponseResult";
import Config from "../../../../../utils/services/MasterConfig";
import { responseCode as responseCodeEnum } from "../../../../../services/enums/responseCode";

export const getAllCompanyService = async (search) => {
  try {
    const {
      data: { responseCode, data, message },
    } = await Config.post(`api/Business/GetAllBusiness?search=${search}`);

    if (responseCode === responseCodeEnum.Success)
      return ResponseResultSuccess(data);
    return ResponseResultError(message);
  } catch (e) {
    return ResponseResultError(e);
  }
};

export const getCompanyByIdService = async (id) => {
  try {
    const {
      data: { responseCode, data, message },
    } = await Config.get(`api/Business/GetBusinessById?id=${id}`);

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

export const ResendSignupEmailService = (id) => {
  return Config.get(`api/Signup/ResendSignupEmail?id=${id}`)
    .then((res) => {
      return res;
    })
    .catch((res) => {
      return res;
    });
};

export const GetSignupByIdService = (id) => {
  return Config.get(`api/Signup/GetSignupById?id=${id}`)
    .then((res) => {
      return res;
    })
    .catch((res) => {
      return res;
    });
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

export const getAllSignupService = async (payload) => {
  console.log(payload, "REQUEST");
  try {
    const {
      data: { responseCode, data, message },
    } = await Config.get(
      `api/Signup/GetAllSignupByWaitingForEmailConfirmation`,
      payload
    );
    console.log(data, "REQUEST REWARD RESPONSE");

    if (responseCode === responseCodeEnum.Success)
      return ResponseResultSuccess(data);
    return ResponseResultError(message);
  } catch (e) {
    return ResponseResultError(e);
  }
};
