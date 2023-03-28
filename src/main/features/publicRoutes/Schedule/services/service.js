import MasterConfig from "../../../../../utils/services/MasterConfig";
import { jsonToFormData } from "../../../../../utils/base";

export const GetReferenceByIdService = (id) => {
  return MasterConfig.get(`api/Reference/GetReferenceById?id=${id}`)
    .then((res) => {
      return res;
    })
    .catch((res) => {
      return res;
    });
};

export const addScheduleByExternalService = (payload) => {
  console.log(payload, "service datatatta");
  const formData = jsonToFormData(payload.data);
  return MasterConfig.post(
    `api/Schedule/AddScheduleByExternal?id=${payload.id}`,
    formData
  )
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log(error.message);
    });
};
