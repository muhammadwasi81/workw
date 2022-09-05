import {
  ResponseResultError,
  ResponseResultSuccess,
} from "../../../../../utils/api/ResponseResult";
import { jsonToFormData } from "../../../../../utils/base";
import Config from "../../../../../utils/services/MasterConfig";

export const addNewTaskService = async (request) => {
  const formData = jsonToFormData(request);
  return Config.post(`api/UserTask/AddUserTask`, formData)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
};

export const getAllTaskService = async (
  request = {
    pageNo: 1,
    pageSize: 20,
    // search: "",
    // priority: [],
    // approverStatus: [],
    filterType: 1,
    // sortBy: 1,
    // startDate: "",
    // endDate: ""
  }
) => {
  try {
    const {
      data: { responseCode, data, message },
    } = await Config.post(`api/UserTask/GetAllUserTask`, request);
    if (responseCode === 1001) return ResponseResultSuccess(data);
    return ResponseResultError(message);
  } catch (e) {
    return ResponseResultError(e);
  }
};

export const getTaskByIdService = async (taskId) => {
  console.log(taskId, "service");
  try {
    const {
      data: { responseCode, data, message },
    } = await Config.get(`api/UserTask/GetUserTaskById?id=${taskId}`);
    if (responseCode === 1001) return ResponseResultSuccess(data);
    return ResponseResultError(message);
  } catch (e) {
    return ResponseResultError(e);
  }
};
