import MasterConfig from "../../../../utils/services/MasterConfig";
const API_PREFIX = "api/WorkBoard/";
export const addWorkboardService = data => {
	return MasterConfig.post(`${API_PREFIX}AddWorkBoard`, data)
		.then(res => {
			return res.data;
		})
		.catch(error => {
			return error;
		});
};

export const getAllWorkboardService = data => {
	return MasterConfig.post(`${API_PREFIX}GetAllWorkBoard`, data)
		.then(res => {
			return res.data;
		})
		.catch(error => {
			return error;
		});
};

export const getWorkboardByIdService = id => {
	return MasterConfig.get(`${API_PREFIX}GetWorkBoardById?id=${id}`)
		.then(res => {
			return res.data;
		})
		.catch(error => {
			return error;
		});
};
