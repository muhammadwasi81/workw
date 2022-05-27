import MasterConfig from "../../../../../utils/services/MasterConfig";

export const getAllRewardCategoryService = () => {
  return MasterConfig.get(`api/rewardcategory/getallrewardcategory`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const addRewardCategoryService = (args) => {
  return MasterConfig.post(`api/rewardcategory/addrewardcategory`, args)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};
