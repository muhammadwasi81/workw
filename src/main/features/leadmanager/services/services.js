import MasterConfig from "../../../../utils/services/MasterConfig";
const API_PREFIX = "api/LeadManager/";

export const addLeadManagerService = data => {
	return MasterConfig.post(`${API_PREFIX}AddLeadManager`, data)
		.then(res => {
			return res.data;
		})
		.catch(error => {
			return error;
		});
};

export const updateLeadManagerService = data => {
	return MasterConfig.put(`${API_PREFIX}UpdateLeadManager`, data)
		.then(res => {
			return res.data;
		})
		.catch(error => {
			return error;
		});
};

export const getAllLeadManagerService = data => {
	return MasterConfig.post(`${API_PREFIX}GetAllLeadManager`, data)
		.then(res => {
			return res.data;
		})
		.catch(error => {
			return error;
		});
};

export const getAllLeadManagerPagingService = data => {
	return MasterConfig.post(`${API_PREFIX}GetAllLeadManagerPaging`, data)
		.then(res => {
			return res.data;
		})
		.catch(error => {
			return error;
		});
};

export const getLeadManagerByIdService = id => {
	return MasterConfig.get(`${API_PREFIX}GetLeadManagerById?id=${id}`)
		.then(res => {
			return res.data;
		})
		.catch(error => {
			return error;
		});
};
