import {
  ResponseResultError,
  ResponseResultSuccess,
} from '../../../../utils/api/ResponseResult';
import MasterConfig from '../../../../utils/services/MasterConfig';
import Config from '../../../../utils/services/MasterConfig';

const API_PREFIX = 'api/';

export const getBankDetailsByUserService = (userID) => {
  console.log('userID Service', userID);
  return MasterConfig.get(
    `${API_PREFIX}UserBankDetail/GetAllUserBankDetail?userId=${userID}`
  )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const addUserBankService = (payload) => {
  return MasterConfig.post(
    `${API_PREFIX}UserBankDetail/AddUserBankDetail`,
    payload
  )
    .then((res) => {
      // console.log(res, 'addUserBankService Service');
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const updateUserBankService = async (payload) => {
  // console.log(payload, 'payload');
  try {
    const {
      data: { responseCode, data, message },
    } = await Config.put(
      `${API_PREFIX}UserBankDetail/UpdateUserBankDetail?userId=${payload.id}`,
      payload.payload
    );
    // console.log(data, 'updateUserBankService service');
    if (responseCode === 1001) return ResponseResultSuccess(data);
    return ResponseResultError(message);
  } catch (e) {
    return ResponseResultError(e);
  }
};
