import AxiosConfig from "../../../../utils/services/AxiosConfig";

const API_PREFIX = "api/officetiming/";
export const getAllOfficeTimingService = () => {
	return AxiosConfig.get(`${API_PREFIX}getallOfficeTimingGroups`)
		.then(res => {
			return res.data;
		})
		.catch(err => {
			return err;
		});
};

export const addOfficeTimingService = args => {
	return AxiosConfig.post(`${API_PREFIX}addOfficeTimingGroup`, args)
		.then(res => {
			return res.data;
		})
		.catch(err => {
			return err;
		});
};
