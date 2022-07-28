import { ResponseResultError, ResponseResultSuccess } from "../../../../utils/api/ResponseResult";
import Config from "../../../../utils/services/MasterConfig";

export const addVoucherService = async (request) => {
	try {
		const {
			data: { responseCode, data, message },
		} = await Config.post(`api/Transaction/AddTransaction`, request);
		if (responseCode === 1001) return ResponseResultSuccess(data);
		return ResponseResultError(message);
	} catch (e) {
		return ResponseResultError(e);
	}
};

// export const getAllChartOfAccountService = async () => {
// 	try {
// 		const {
// 			data: { responseCode, data, message },
// 		} = await Config.get(`api/ChartOfAccount/GetAllChartOfAccount`);
// 		if (responseCode === 1001) return ResponseResultSuccess(data);
// 		return ResponseResultError(message);
// 	} catch (e) {
// 		return ResponseResultError(e);
// 	}
// };

// export const updateChartOfAccountService = async(request) => {
// 	try {
// 		const {
// 			data: { responseCode, data, message },
// 		} = await Config.put(`api/ChartOfAccount/UpdateChartOfAccount`, request);
// 		if (responseCode === 1001) return ResponseResultSuccess(data);
// 		return ResponseResultError(message);
// 	} catch (e) {
// 		return ResponseResultError(e);
// 	}
// };
