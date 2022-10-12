import { jsonToFormData } from "../../../../utils/base";
import MasterConfig from "../../../../utils/services/MasterConfig";

export const getAllRequisitionService = data => {
	return MasterConfig.post(`api/Requisition/GetAllRequisition`, data)
		.then(res => {
			return res.data;
		})
		.catch(err => {
			return err;
		});
};

export const addRequisitionService = async(data) => {
	const formData = jsonToFormData(data);
	return MasterConfig.post(`api/Requisition/AddRequisition`, formData)
		.then(res => {
			return res;
		})
		.catch(res => {
			return res;
		});
};

export const GetRequisitionByIdService = id => {
	return MasterConfig.get(`api/Requisition/GetRequisitionById?id=${id}`)
		.then(res => {
			return res;
		})
		.catch(res => {
			return res;
		});
};

export const cancelRewardService = id => {
	return MasterConfig.delete(`api/Reward/RewardCancel?rewardId=${id}`)
		.then(res => {
			return res;
		})
		.catch(res => {
			return res;
		});
};