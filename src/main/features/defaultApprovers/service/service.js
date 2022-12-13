import {
  ResponseResultError,
  ResponseResultSuccess,
} from '../../../../utils/api/ResponseResult';
import Config from '../../../../utils/services/MasterConfig';

export const getAllDefaultApprovers = async (payload) => {
  try {
    const {
      data: { responseCode, data, message },
    } = await Config.post(
      `/api/DefaultApproval/GetAllDefaultApproval`,
      payload
    );
    console.log(data, 'getAllDefaultApprovers service');
    if (responseCode === 1001) return ResponseResultSuccess(data);
    return ResponseResultError(message);
  } catch (e) {
    return ResponseResultError(e);
  }
};

export const addDefaultApprovers = async (payload) => {
  try {
    const {
      data: { responseCode, data, message },
    } = await Config.post(`/api/DefaultApproval/AddDefaultApproval`, payload);
    console.log(data, 'getAllDefaultApprovers service');
    if (responseCode === 1001) return ResponseResultSuccess(data);
    return ResponseResultError(message);
  } catch (e) {
    return ResponseResultError(e);
  }
};
