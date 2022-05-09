import AxiosConfig from "../../../../utils/services/AxiosConfig";
const API_PREFIX = "konnectapi/api/Travel/";
export const addTravelService = data => {
	return AxiosConfig.post(`${API_PREFIX}AddTravel`, data)
		.then(res => {
			return res.data;
		})
		.catch(error => {
			return error;
		});
};
