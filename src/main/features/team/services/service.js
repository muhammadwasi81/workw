// import AxiosConfig from "../../../../utils/services/AxiosConfig";
import {
  ResponseResultError,
  ResponseResultSuccess,
} from "../../../../utils/api/ResponseResult";
import Config from "../../../../utils/services/MasterConfig";
import { responseCode as responseCodeEnum } from "../../../../services/enums/responseCode";

// const getAllTeam_TD = (data) => {
//   return {
//     pageNo: data.pageNo ? data.pageNo : 1,
//     pageSize: data.pageSize ? data.pageSize : 20,
//     search: data.search ? data.search : "",
//   };
// };
// export const addTeamService = async (request) => {
//   try {
//     const {
//       data: { responseCode, data, message },
//     } = await Config.post(`api/Employee/AddEmployee`, request);
//     if (responseCode === responseCodeEnum.Success)
//       return ResponseResultSuccess(data);
//     return ResponseResultError(message);
//   } catch (e) {
//     return ResponseResultError(e);
//   }
// };

export const getAllTeamsService = async (request) => {
  // let request = getAllTeam_TD(data);
  // console.log(request, "REQUEST TEAM");
  try {
    const {
      data: { responseCode, data, message },
    } = await Config.get(`api/Employee/GetAllEmployeeShort`, request);
    // console.log(responseCode, "REQUEST TEAM RESPONSE");

    if (responseCode === responseCodeEnum.Success)
      return ResponseResultSuccess(data);
    return ResponseResultError(message);
  } catch (e) {
    return ResponseResultError(e);
  }
};
