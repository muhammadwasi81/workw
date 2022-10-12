// import AxiosConfig from "../../../../utils/services/AxiosConfig";
import { jsonToFormData } from "../../../../utils/base";
import MasterConfig from "../../../../utils/services/MasterConfig";
const API_PREFIX = "api/Employee/";

export const addEmployeeService = data => {
	const formData = jsonToFormData(data);
	return MasterConfig.post(`${API_PREFIX}AddEmployee`, formData)
		.then(res => {
			return res.data;
		})
		.catch(error => {
			return error;
		});
};

export const getAllEmployeesService = () => {
	return MasterConfig.get(`${API_PREFIX}GetAllEmployeeShort`)
		.then(res => {
			return res.data;
		})
		.catch(err => {
			return err;
		});
};
