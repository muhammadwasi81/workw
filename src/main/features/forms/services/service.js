import MasterConfig from "../../../../utils/services/MasterConfig";
import { jsonToFormData } from "../../../../utils/base";

export const getAllFormsService = (data) => {
  return MasterConfig.post(`api/Form/GetAllForm`, data)
    .then((res) => {
      // console.log("response data from service", res.data);
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

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
