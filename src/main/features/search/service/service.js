import MasterConfig from "../../../../utils/services/MasterConfig";
const API_PREFIX = "api/Search/";

export const getAllSearchService = (data) => {
  console.log(data, "dataaa");
  return MasterConfig.post(`${API_PREFIX}GetAllSearch`, data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};
