import AxiosConfig from "../../../../utils/services/AxiosConfig";

const API_PREFIX = "konnectapi/api/Designation/";
export const getAllDesignationsService = () => {
	return AxiosConfig.get(`${API_PREFIX}getalldesignation`)
		.then(res => {
			return res.data;
		})
		.catch(err => {
			return err;
		});
};

export const addDesignationService = args => {
	return AxiosConfig.post(`${API_PREFIX}addDesignation`, args)
		.then(res => {
			return res.data;
		})
		.catch(err => {
			return err;
		});
};
