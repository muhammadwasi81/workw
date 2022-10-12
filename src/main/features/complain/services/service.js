import MasterConfig from "../../../../utils/services/MasterConfig";

export const getAllComplainService = (data) => {
  return MasterConfig.post(`api/Complain/GetAllComplain`, data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const addComplainService = (data) => {
  return MasterConfig.post(`api/Complain/AddComplain`, data)
    .then((res) => {
      return res;
    })
    .catch((res) => {
      return res;
    });
};

export const getComplainByIdService = (id) => {
  return MasterConfig.get(`api/Complain/GetComplainById?id=${id}`)
    .then((res) => {
      return res;
    })
    .catch((res) => {
      return res;
    });
};

export const cancelComplainService = id => {
	return MasterConfig.delete(`api/Complain/ComplainCancel?id=${id}`)
		.then(res => {
			return res;
		})
		.catch(res => {
			return res;
		});
};
