import MasterConfig from "../../../../utils/services/MasterConfig";
const API_PREFIX = "api/Comment/";
export const postComment = (comment) => {
  return MasterConfig.post(`${API_PREFIX}AddComment`, comment)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
};
