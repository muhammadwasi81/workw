import { ResponseResultError, ResponseResultSuccess } from "../../../../utils/api/ResponseResult";
import Config from "../../../../utils/services/MasterConfig";

export const addNewTaskService = async (request) => {
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
		} = await Config.post(`api/ChartOfAccount/AllChartOfAccount`);
		if (responseCode === 1001) return ResponseResultSuccess(data);
		return ResponseResultError(message);
	} catch (e) {
		return ResponseResultError(e);
	}
};

