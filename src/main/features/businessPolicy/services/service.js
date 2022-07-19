// import AxiosConfig from "../../../../utils/services/AxiosConfig";
import MasterConfig from "../../../../utils/services/MasterConfig";
const API_PREFIX = "api/BusinessPolicy/";
export const addBusinessPolicyService = data => {
	return MasterConfig.post(`${API_PREFIX}AddBusinessPolicy`, data)
		.then(res => {
			return res.data;
		})
		.catch(error => {
			return error;
		});
};

export const getAllBusinessPolicyService = () => {
	return MasterConfig.get(`${API_PREFIX}GetAllBusinessPolicy`)
		.then(res => {
			return res.data;
		})
		.catch(error => {
			return error;
		});
};

export const getAccessRoleByIdService = data => {
	return MasterConfig.get(
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
	return MasterConfig.put(`${API_PREFIX}UpdateAccessRole`, data)
		.then(res => {
			return res.data;
		})
		.catch(error => {
			return error;
		});
};
