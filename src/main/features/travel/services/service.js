// import AxiosConfig from "../../../../utils/services/AxiosConfig";
import MasterConfig from "../../../../utils/services/MasterConfig";
const API_PREFIX = "api/Travel/";
export const addTravelService = data => {
	return MasterConfig.post(`${API_PREFIX}AddTravel`, data)
		.then(res => {
			return res.data;
		})
		.catch(error => {
			return error;
		});
};

export const getAllTravelService = data => {
	return MasterConfig.post(`${API_PREFIX}GetAllTravel`, data)
		.then(res => {
			return res.data;
		})
		.catch(error => {
			return error;
		});
};
