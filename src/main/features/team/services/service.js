// import AxiosConfig from "../../../../utils/services/AxiosConfig";
import {
  ResponseResultError,
  ResponseResultSuccess,
} from "../../../../utils/api/ResponseResult";
import Config from "../../../../utils/services/MasterConfig";
import { responseCode as responseCodeEnum } from "../../../../services/enums/responseCode";

export const getAllTeamsService = async (request) => {
  // let request = getAllTeam_TD(data);
  // console.log(request, "REQUEST TEAM");
  try {
    const {
      data: { responseCode, data, message },
    } = await Config.get(
      `api/Employee/GetAllEmployeeShort?search=${request.search}`
    );
    // console.log(responseCode, "REQUEST TEAM RESPONSE");

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

export const getAllWarningService = async (id) => {
  // console.log(request, "REQUEST");
  try {
    const {
      data: { responseCode, data, message },
    } = await Config.get(`api/Warning/GetWarningUserById?userId=${id}`);
    // console.log(responseCode, "REQUEST REWARD RESPONSE");

    if (responseCode === responseCodeEnum.Success)
      return ResponseResultSuccess(data);
    return ResponseResultError(message);
  } catch (e) {
    return ResponseResultError(e);
  }
};
export const getAllLeaveService = async (id) => {
  try {
    console.log(id, "REQUEST Leave RESPONSE");
    const {
      data: { responseCode, data, message },
    } = await Config.get(`api/Leave/GetLeaveUserById?userId=${id}`);
    console.log(data, "REQUEST Leave RESPONSE");

    if (responseCode === responseCodeEnum.Success)
      return ResponseResultSuccess(data);
    return ResponseResultError(message);
  } catch (e) {
    return ResponseResultError(e);
  }
};

export const getAllCheckInService = async (id) => {
  try {
    console.log(id, "REQUEST Leave RESPONSE");
    const {
      data: { responseCode, data, message },
    } = await Config.get(
      `api/Attendance/GetAttendanceCheckInUserById?userId=${id}`
    );
    console.log(data, "REQUEST check in RESPONSE");

    if (responseCode === responseCodeEnum.Success)
      return ResponseResultSuccess(data);
    return ResponseResultError(message);
  } catch (e) {
    return ResponseResultError(e);
  }
};
