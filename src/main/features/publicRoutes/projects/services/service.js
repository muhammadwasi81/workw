import MasterConfig from "../../../../../utils/services/MasterConfig";

export const GetReferenceByIdService = (id) => {
  console.log("ID FROM SERVICE", id);
  return MasterConfig.get(`api/Reference/GetReferenceById?id=${id}`)
    .then((res) => {
      return res;
    })
    .catch((res) => {
      return res;
    });
};

export const addScheduleByExternalService = (data) => {
  return MasterConfig.post(`api/Schedule/AddScheduleByExternal`, data)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
};
