import AxiosConfig from "../../../../utils/services/AxiosConfig";

const API_PREFIX = "konnectapi/api/Administration/WarningCategory/";
export const getAllWarningCategoriesService = () => {
  return AxiosConfig.get(`${API_PREFIX}getallWarningCategory`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const addWarningCategoryService = (args) => {
  return AxiosConfig.post(`${API_PREFIX}addWarningCategory`, args)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};
