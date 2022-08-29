import MasterConfig from "../../../../utils/services/MasterConfig";

export const getAllBonusService = (data) => {
  return MasterConfig.post(`api/Bonus/GetAllBonus`, data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const addBonusService = (data) => {
  return MasterConfig.post(`api/Bonus/AddBonus`, data)
    .then((res) => {
      return res;
    })
    .catch((res) => {
      return res;
    });
};

export const GetBonusByIdService = (id) => {
  return MasterConfig.get(`api/Bonus/GetBonusById?id=${id}`)
    .then((res) => {
      return res;
    })
    .catch((res) => {
      return res;
    });
};

export const cancelBonusService = id => {
	return MasterConfig.delete(`api/bonus/BonusCancel?id=${id}`)
		.then(res => {
			return res;
		})
		.catch(res => {
			return res;
		});
};