// import AxiosConfig from "../../../../utils/services/AxiosConfig";
import {
  ResponseResultError,
  ResponseResultSuccess,
} from "../../../../utils/api/ResponseResult";
import Config from "../../../../utils/services/MasterConfig";
import { responseCode as responseCodeEnum } from "../../../../services/enums/responseCode";

export const getAllTeamsService = async (userId) => {
  try {
    const {
      data: { responseCode, data, message },
    } = await Config.get(`api/Employee/GetAllTeamByUserId?userId=${userId}`);

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

export const getAllCoursesService = async (id) => {
  console.log(id, "REQUEST");
  try {
    const {
      data: { responseCode, data, message },
    } = await Config.get(
      `api/ELearning/GetELearningCourseCurriculumTopicAttemptByMe?userId=${id}`
    );
    console.log(responseCode, "response code");
    if (responseCode === responseCodeEnum.Success)
      return ResponseResultSuccess(data);
    return ResponseResultError(message);
  } catch (e) {
    return ResponseResultError(e);
  }
};

export const getAllAppraisalService = async (id) => {
  console.log(id, "Appraisal");
  try {
    const {
      data: { responseCode, data, message },
    } = await Config.get(`api/Appraisal/GetAppraisalByMe?userId=${id}`);
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
    } = await Config.get(`api/UserLeave/GetAllUserLeave?userId=${id}`);
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

export const getDeviceInfoService = async (payload) => {
  try {
    console.log(payload, "REQUEST Leave RESPONSE");
    const {
      data: { responseCode, data, message },
    } = await Config.post(`api/Device/GetAllDevice`, payload);
    console.log(data, "REQUESTcheck");

    if (responseCode === responseCodeEnum.Success)
      return ResponseResultSuccess(data);
    return ResponseResultError(message);
  } catch (e) {
    return ResponseResultError(e);
  }

  // try {
  //   const res = await Config.post(`api/Device/GetAllDevice`, payload);
  //   return res.data;
  // } catch (err) {
  //   return err;
  // }
};

export const addTeamMemberService = async (payload) => {
  try {
    const {
      data: { responseCode, data, message },
    } = await Config.put(
      `api/Employee/updateManager?userId=${payload.userId}&managerId=${payload.managerId}`
    );
    console.log(data, "AddUserEmergencyContact service");
    if (responseCode === 1001) return ResponseResultSuccess(data);
    return ResponseResultError(message);
  } catch (e) {
    return ResponseResultError(e);
  }
};
