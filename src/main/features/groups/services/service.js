import MasterConfig from "../../../../utils/services/MasterConfig";
const API_PREFIX = "/api/Group/";

export const getAllGroupService = data => {
	return MasterConfig.get(`${API_PREFIX}GetAllGroup`)
		.then(res => {
			return res.data;
		})
		.catch(err => {
			return err;
		});
};

export const addGroupService = data => {
	return MasterConfig.post(`${API_PREFIX}AddGroup`, data)
		.then(res => {
			return res.data;
		})
		.catch(error => {
			return error;
		});
};
