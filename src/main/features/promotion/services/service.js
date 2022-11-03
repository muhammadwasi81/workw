import MasterConfig from "../../../../utils/services/MasterConfig";

export const getAllPromotionService = (data) => {
  return MasterConfig.post(`api/Promotion/GetAllPromotion`, data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const addPromotionService = (data) => {
  return MasterConfig.post(`api/Promotion/AddPromotion`, data)
    .then((res) => {
      return res;
    })
    .catch((res) => {
      return res;
    });
};

export const GetPromotionByIdService = (id) => {
  return MasterConfig.get(`api/Promotion/GetPromotionById?id=${id}`)
    .then((res) => {
      return res;
    })
    .catch((res) => {
      return res;
    });
};

export const cancelPromotionService = id => {
	return MasterConfig.delete(`api/Promotion/PromotionCancel?promotionId=${id}`)
		.then(res => {
			return res;
		})
		.catch(res => {
			return res;
		});
};
