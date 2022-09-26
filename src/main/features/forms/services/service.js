import MasterConfig from "../../../../utils/services/MasterConfig";
import { jsonToFormData } from "../../../../utils/base";

export const addFormService = (data) => {
  console.log("data from form", data);
  const formData = jsonToFormData(data);
  // console.log("formdatatoFormdata", formData);
  return MasterConfig.post(`api/Form/AddForm`, formData)
    .then((res) => {
      console.log(res, "response from dept service");
      return res;
    })
    .catch((res) => {
      return res;
    });
};
