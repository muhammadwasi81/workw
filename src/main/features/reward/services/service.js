import MasterConfig from "../../../../utils/services/MasterConfig";

export const getAllRewardService = data => {
	return MasterConfig.post(`api/Reward/GetAllReward`, data)
		.then(res => {
			console.log(res.data, "HELLOOOO");
			return res.data;
		})
		.catch(err => {
			console.log(err, "HELLOOOO");
			return err;
		});
};

export const addRewardService = data => {
	return MasterConfig.post(`api/Reward/AddReward`, data)
		.then(res => {
			// console.log(res, "from service")
			return res;
		})
		.catch(res => {
			return res;
		});
};

export const GetRewardByIdService = data => {
	return MasterConfig.get(`api/Reward/GetRewardById`, data)
		.then(res => {
			// console.log(res, "from service")
			return res;
		})
		.catch(res => {
			return res;
		});
};
