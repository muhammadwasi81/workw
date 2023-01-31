import MasterConfig from '../../../../utils/services/MasterConfig';

export const getUserDeviceInfoService = async (payload) => {
  try {
    const res = await MasterConfig.post(`api/Device/GetAllDevice`, payload);
    console.log(res, 'getUserDeviceInfoService');
    return res.data;
  } catch (err) {
    return err;
  }
};
