import { jsonToFormData } from "../../../../utils/base";
import MasterConfig from "../../../../utils/services/MasterConfig";

export const addCourseService = async (data) => {
  const formData = jsonToFormData(data);
  return MasterConfig.post(`api/ELearning/AddCourse`, formData)
    .then((res) => {
      return res;
    })
    .catch((res) => {
      return res;
    });
};
