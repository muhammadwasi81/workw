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
  console.log("formdatatoFormdata", formData);
  return MasterConfig.post(`api/Form/AddForm`, formData)
    .then((res) => {
      console.log(res, "response from dept service");
      return res;
    })
    .catch((res) => {
      return res;
    });
};

export const updateFormService = (data) => {
  console.log("data from form service", data);
  const formData = jsonToFormData(data);
  return MasterConfig.put(`api/Form/UpdateForm`, formData)
    .then((res) => {
      // console.log(res, "response from dept service");
      return res;
    })
    .catch((res) => {
      return res;
    });
};

export const submitFormService = (data) => {
  console.log("data from form", data);
  // const formData = jsonToFormData(data);
  console.log("formdatatoFormdata", data);
  return MasterConfig.post(`api/Form/AddFormAttempt`, data)
    .then((res) => {
      console.log(res, "response from dept service");
      return res;
    })
    .catch((res) => {
      return res;
    });
};

export const GetFormByIdService = (id) => {
  // console.log("ID FROM SERVICE", id);
  return MasterConfig.get(`api/Form/GetFormById?id=${id}`)
    .then((res) => {
      return res;
    })
    .catch((res) => {
      return res;
    });
};
