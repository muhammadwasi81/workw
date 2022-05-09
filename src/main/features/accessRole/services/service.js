import AxiosConfig from "../../../../utils/services/AxiosConfig";
const API_PREFIX = "konnectapi/api/AccessRole/";
export const addAccessRoleService = data => {
	return AxiosConfig.post(`${API_PREFIX}AddAccessRole`, data)
		.then(res => {
			return res.data;
		})
		.catch(error => {
			return error;
		});
};

export const getAllAccessRolesService = () => {
	return AxiosConfig.get(`${API_PREFIX}GetAllAccessRole`)
		.then(res => {
			return res.data;
		})
		.catch(error => {
			return error;
		});
};

export const getAccessRoleByIdService = data => {
	return AxiosConfig.get(
		`${API_PREFIX}GetAccessRoleById?accessRoleId=${data}`
	)
		.then(res => {
			return res.data;
		})
		.catch(error => {
			return error;
		});
};

export const updateAccessRoleByIdService = data => {
	return AxiosConfig.put(`${API_PREFIX}UpdateAccessRole`, data)
		.then(res => {
			return res.data;
		})
		.catch(error => {
			return error;
		});
};
