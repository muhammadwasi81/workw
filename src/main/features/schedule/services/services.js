import MasterConfig from "../../../../utils/services/MasterConfig";
const API_PREFIX = "api/Schedule/";

export const addScheduleService = data => {
	return MasterConfig.post(`${API_PREFIX}AddSchedule`, data)
		.then(res => {
			return res.data;
		})
		.catch(error => {
			return error;
		});
};

export const getAllScheduleService = data => {
	return MasterConfig.post(`${API_PREFIX}GetAllSchedule`, data)
		.then(res => {
			return res.data;
		})
		.catch(error => {
			return error;
		});
};
