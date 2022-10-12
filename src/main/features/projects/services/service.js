import MasterConfig from "../../../../utils/services/MasterConfig";
const API_PREFIX = "api/Project/";

export const getAllProjectsService = data => {
	return MasterConfig.post(`${API_PREFIX}GetAllProject`, data)
		.then(res => {
			return res.data;
		})
		.catch(err => {
			return err;
		});
};

export const getProjectByIdService = id => {
	return MasterConfig.get(`${API_PREFIX}GetProjectById?id=${id}`)
		.then(res => {
			return res.data;
		})
		.catch(err => {
			return err;
		});
};

export const updateProjectService = data => {
	return MasterConfig.put(`${API_PREFIX}UpdateProject`, data)
		.then(res => {
			return res.data;
		})
		.catch(err => {
			return err;
		});
};

export const addProjectService = data => {
	return MasterConfig.post(`${API_PREFIX}AddProject`, data)
		.then(res => {
			return res.data;
		})
		.catch(err => {
			return err;
		});
};
