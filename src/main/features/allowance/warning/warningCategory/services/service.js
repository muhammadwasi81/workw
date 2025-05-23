import MasterConfig from "../../../../../utils/services/MasterConfig";

export const getAllWarningCategoriesService = () => {
  return MasterConfig.get(`api/WarningCategory/getallWarningCategory`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const addWarningCategoryService = (args) => {
  return MasterConfig.post(`api/WarningCategory/addWarningCategory`, args)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};
