import MasterConfig from "../../../../utils/services/MasterConfig";

export const getAllOfficeTimingService = (args) => {
  return MasterConfig.get(`api/OfficeTiming/GetAllOfficeTimingGroups`, args)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const addOfficeTimingService = (args) => {
  console.log(args, "argservice");
  return MasterConfig.post(`api/OfficeTiming/AddOfficeTimingGroup`, args)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const updateOfficeTimingService = (args) => {
  return MasterConfig.put(`api/OfficeTiming/UpdateOfficeTimingGroup`, args)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const getOfficeTimingbyIdService = (id) => {
  return MasterConfig.get(
    `api/OfficeTiming/GetAllOfficeTimingGroupById?id=${id}`
  )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};
