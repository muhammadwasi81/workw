import { jsonToFormData } from "../../../../utils/base";
import MasterConfig from "../../../../utils/services/MasterConfig";

export const getAllRewardService = (data) => {
  return MasterConfig.post(`api/Reward/GetAllReward`, data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const addRewardService = async (data) => {
  const formData = jsonToFormData(data);
  return MasterConfig.post(`api/Reward/AddReward`, formData)
    .then((res) => {
      return res;
    })
    .catch((res) => {
      return res;
    });
};

export const GetRewardByIdService = (id) => {
  return MasterConfig.get(`api/Reward/GetRewardById?id=${id}`)
    .then((res) => {
      return res;
    })
    .catch((res) => {
      return res;
    });
}; 

export const cancelRewardService = (data) => {
  const formData = jsonToFormData(data);
  return MasterConfig.post(`api/Reward/RewardCancel`, formData)
    .then((res) => {
      return res;
    })
    .catch((res) => {
      return res;
    });
};
