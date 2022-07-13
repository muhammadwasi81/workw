import { message } from "antd";
import { responseCode } from "../../../../services/enums/responseCode";
import MasterConfig from "../../../../utils/services/MasterConfig";

const API_PREFIX = "api/Comment/";
export const postComment = async (comment) => {
  const response = await MasterConfig.post(`${API_PREFIX}AddComment`, comment)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
  if (response.responseCode !== responseCode.Success) {
    message.error("Something went wrong");
  }
  return response.data;
};
