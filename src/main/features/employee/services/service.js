// import AxiosConfig from "../../../../utils/services/AxiosConfig";
import MasterConfig from "../../../../utils/services/MasterConfig";
const API_PREFIX = "api/Employee/";

export const addEmployeeService = data => {
	return MasterConfig.post(`${API_PREFIX}AddEmployee`, data)
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
