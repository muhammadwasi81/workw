import AxiosConfig from "../../../../utils/services/AxiosConfig";
const API_PREFIX = "konnectapi/api/Employee/";


export const addEmployeeService = data => {
	return AxiosConfig.post(`${API_PREFIX}AddEmployee`, data)
		.then(res => {
			return res.data;
		})
		.catch(error => {
			return error;
		});
};


export const getAllEmployeesService = () => {
	return AxiosConfig.get(
		"https://58.65.211.234:4436/konnectapi/api/RewardCategory/GetAllRewardCategory"
	)
		.then(res => {
			return res.data;
		})
		.catch(err => {
			return err;
		});
};