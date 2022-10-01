import MasterConfig from "../../../../utils/services/MasterConfig";
const API_PREFIX = "api/LeadManager/";
const API_SECTION_PREFIX = "api/LeadManagerSection/";
const API_LEAD_MANAGER_PREFIX = "api/LeadManagerDetail/";
const API_LEAD_MANAGER_CONTACT_PREFIX = "api/LeadManagerDetailContact/";

export const addLeadManagerService = data => {
	return MasterConfig.post(`${API_PREFIX}AddLeadManager`, data)
		.then(res => {
			return res.data;
		})
		.catch(error => {
			return error;
		});
};

export const addLeadManagerDetailService = data => {
	return MasterConfig.post(
		`${API_LEAD_MANAGER_PREFIX}AddLeadManagerDetail`,
		data
	)
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

export const getLeadManagerSectionByIdService = id => {
	return MasterConfig.get(
		`${API_SECTION_PREFIX}GetLeadManagerSectionById?id=${id}`
	)
		.then(res => {
			return res.data;
		})
		.catch(error => {
			return error;
		});
};

export const getLeadManagerSectionDetailByIdService = id => {
	return MasterConfig.get(
		`${API_LEAD_MANAGER_PREFIX}GetLeadManagerDetailById?id=${id}`
	)
		.then(res => {
			return res.data;
		})
		.catch(error => {
			return error;
		});
};

export const addLeadManagerContactService = data => {
	return MasterConfig.post(
		`${API_LEAD_MANAGER_CONTACT_PREFIX}AddLeadManagerDetailContact`,
		data
	)
		.then(res => {
			return res.data;
		})
		.catch(error => {
			return error;
		});
};

export const updateLeadManagerDetailService = data => {
	return MasterConfig.put(
		`${API_LEAD_MANAGER_PREFIX}UpdateLeadManagerDetail`,
		data
	)
		.then(res => {
			return res.data;
		})
		.catch(error => {
			return error;
		});
};

export const getLeadManagerContactDetailService = id => {
	return MasterConfig.get(
		`${API_LEAD_MANAGER_CONTACT_PREFIX}GetLeadManagerDetailContactById?id=${id}`
	)
		.then(res => {
			return res.data;
		})
		.catch(error => {
			return error;
		});
};

export const updateLeadManagerContactService = data => {
	return MasterConfig.put(
		`${API_LEAD_MANAGER_CONTACT_PREFIX}UpdateLeadManagerDetailContact`,
		data
	)
		.then(res => {
			return res.data;
		})
		.catch(error => {
			return error;
		});
};

export const moveLeadManagerSectionService = data => {
	return MasterConfig.post(
		`${API_SECTION_PREFIX}MoveLeadManagerSection`,
		data
	)
		.then(res => {
			return res.data;
		})
		.catch(error => {
			return error;
		});
};

export const moveLeadManagerDetailService = data => {
	return MasterConfig.post(
		`${API_LEAD_MANAGER_PREFIX}MoveLeadManagerDetail`,
		data
	)
		.then(res => {
			return res.data;
		})
		.catch(error => {
			return error;
		});
};

// export const deleteLeadManagerContactService = id => {
// 	return MasterConfig.delete(
// 		`${API_LEAD_MANAGER_CONTACT_PREFIX}RemoveLeadManagerContact?id=${id}`
// 	)
// 		.then(res => {
// 			return res.data;
// 		})
// 		.catch(error => {
// 			return error;
// 		});
// };
