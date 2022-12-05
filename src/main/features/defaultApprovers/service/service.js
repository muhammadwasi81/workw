import {
  ResponseResultError,
  ResponseResultSuccess,
} from '../../../../utils/api/ResponseResult';
import MasterConfig from '../../../../utils/services/MasterConfig';
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

export const getDefaultApproversById = (id) => {
  return MasterConfig.get(`/api/DefaultApproval/GetApprovalById?id=${id}`)
    .then((res) => {
      console.log(res.data, 'getDefaultApproversById service');
      return res;
    })
    .catch((res) => {
      return res;
    });
};

// export const addDefaultApprovers = (data) => {
//   return MasterConfig.post(`/api/DefaultApproval/AddDefaultApproval`, data)
//     .then((res) => {
//       console.log(res.data, 'addDefaultApprovers service');
//       return res;
//     })
//     .catch((res) => {
//       return res;
//     });
// };
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

export const deleteDefaultApproversById = (id) => {
  return MasterConfig.delete(`/api/DefaultApproval/DeleteApproval?id=${id}`)
    .then((res) => {
      console.log(res.data, 'deleteDefaultApproversById service');
      return res;
    })
    .catch((res) => {
      return res;
    });
};
