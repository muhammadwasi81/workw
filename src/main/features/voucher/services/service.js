import { ResponseResultError, ResponseResultSuccess } from "../../../../utils/api/ResponseResult";
import Config from "../../../../utils/services/MasterConfig";

const getAllVoucher_dbo = (data) => {
	return {
		"pageNo": data.pageNo ? data.pageNo : 1,
		"pageSize": data.pageSize ? data.pageSize : 20,
		"search": data.search ? data.search : "",
		"startDate": data.startDate ? data.startDate : null,
		"endDate": data.endDate ? data.endDate : null,
		"voucherTypes": data.voucherTypes ? data.voucherTypes : [],
		"sortBy": data.sortBy ? data.sortBy : 0
	}
}
const getLedger_dbo = (data) => {
	return {
		"pageNo": data.pageNo ? data.pageNo : 1,
		"pageSize": data.pageSize ? data.pageSize : 20,
		"search": data.search ? data.search : "",
		"startDate": data.startDate ? data.startDate : null,
		"endDate": data.endDate ? data.endDate : null,
		"accountId": data.accountId ? data.accountId : null,
		"balanceBroughtForward": data.balanceBroughtForward !== undefined ? data.balanceBroughtForward : true
	}
};

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

export const getVoucherDetailService = async (id) => {
	try {
		const {
			data: { responseCode, data, message },
		} = await Config.get(`api/Transaction/GetTransactionById?id=${id}`);
		if (responseCode === 1001) return ResponseResultSuccess(data);
		return ResponseResultError(message);
	} catch (e) {
		return ResponseResultError(e);
	}
};

export const getAllVoucherService = async (payload={}) => {
	try {
		let request = getAllVoucher_dbo(payload);
		const {
			data: { responseCode, data, message },
		} = await Config.post(`api/Transaction/GetAllTransaction`, request);
		if (responseCode === 1001) return ResponseResultSuccess(data);
		return ResponseResultError(message);
	} catch (e) {
		return ResponseResultError(e);
	}
};
export const getLegderService = async (payload={}) => {
	try {
		let request = getLedger_dbo(payload);
		const {
			data: { responseCode, data, message },
		} = await Config.post(`api/Transaction/GetLedger`, request);
		if (responseCode === 1001) return ResponseResultSuccess(data);
		return ResponseResultError(message);
	} catch (e) {
		return ResponseResultError(e);
	}
};

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
