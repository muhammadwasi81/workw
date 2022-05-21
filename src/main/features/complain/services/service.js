import MasterConfig from "../../../../utils/services/MasterConfig";

export const getAllRewardService = data => {
	return MasterConfig.post(`api/Complain/GetAllComplain`, data)
		.then(res => {
			return res.data;
		})
		.catch(err => {
			return err;
		});
};

export const addRewardService = data => {
	return MasterConfig.post(`api/Complain/AddComplain`, data)
		.then(res => {
			return res;
		})
		.catch(res => {
			return res;
		});
};

export const GetRewardByIdService = id => {
	console.log("ID FROM SERVICE", id)
	return MasterConfig.get(`api/Reward/GetRewardById?id=${id}`)
		.then(res => {
			return res;
		})
		.catch(res => {
			return res;
		});
};