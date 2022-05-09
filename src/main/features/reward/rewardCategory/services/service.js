import AxiosConfig from "../../../../../utils/services/AxiosConfig";

const API_PREFIX = "konnectapi/api/rewardcategory/";

export const getAllRewardCategoryService = () => {
  return AxiosConfig.get(`${API_PREFIX}getallrewardcategory`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const addRewardCategoryService = (args) => {
  return AxiosConfig.post(`${API_PREFIX}addrewardcategory`, args)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};
