import { ResponseResultError, ResponseResultSuccess } from "../../../../utils/api/ResponseResult";
import Config from "../../../../utils/services/MasterConfig";

export const addChartOfAccountService = async (request) => {
	try {
		const {
			data: { responseCode, data, message },
		} = await Config.post(`api/ChartOfAccount/AddChartOfAccount`, request);
		if (responseCode === 1001) return ResponseResultSuccess(data);
		return ResponseResultError(message);
	} catch (e) {
		return ResponseResultError(e);
	}
};

export const getAllChartOfAccountService = async () => {
	try {
		const {
			data: { responseCode, data, message },
		} = await Config.get(`api/ChartOfAccount/GetAllChartOfAccount`);
		if (responseCode === 1001) return ResponseResultSuccess(data);
		return ResponseResultError(message);
	} catch (e) {
		return ResponseResultError(e);
	}
};

export const updateChartOfAccountService = data => {
	return Config.put(`api/ChartOfAccount/UpdateChartOfAccount`, data)
		.then(res => {
			return res.data;
		})
		.catch(error => {
			return error;
		});
};
