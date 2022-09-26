import { ResponseResultError, ResponseResultSuccess } from "../../../../utils/api/ResponseResult";
import Config from "../../../../utils/services/MasterConfig";

const getCalculatedPayroll_dto = (data) => {
	return {
		"departments": data.departments ? data.departments : [],
		"month": data.month ? data.month : 0,
		"year": data.year ? data.year : 0,
		"employees": data.employees ? data.employees : []
	}
};
const addPayroll_dto = (data) => {
	return {
		"description": data.description ? data.description : ".",
		"disperseDate": data.disperseDate ? data.disperseDate : null,
		"total": data.total ? data.total : 0,
		"details": data.details ? data.details : [],
		"approvers": data.approvers ? data.approvers : [],       
		"month": data.month ? data.month : 0,       
		"year": data.year ? data.year : 0
	}
};
const getAllPayroll_dto = (data) => {
	return {
		"pageNo": data.pageNo ? data.pageNo : 1,
		"pageSize": data.pageSize ? data.pageSize : 50,
		"search": data.search ? data.search : "",
		"approverStatus": data.approverStatus ? data.approverStatus : [],
		"filterType": data.filterType ? data.filterType : 0,
		"sortBy": data.sortBy ? data.sortBy : 1
	}
};

export const getAllPayrollService = async (payload = {}) => {
	try {
		let request = getAllPayroll_dto(payload);
		const {
			data: { responseCode, data, message },
		} = await Config.post(`api/Payroll/GetAllPayroll`, request);
		if (responseCode === 1001) return ResponseResultSuccess(data);
		return ResponseResultError(message);
	} catch (e) {
		return ResponseResultError(e);
	}
};
export const getCalculatedPayrollService = async (payload = {}) => {
	try {
		let request = getCalculatedPayroll_dto(payload);
		const {
			data: { responseCode, data, message },
		} = await Config.post(`api/Payroll/GetCalculatedPayroll`, request);
		if (responseCode === 1001) return ResponseResultSuccess(data);
		return ResponseResultError(message);
	} catch (e) {
		return ResponseResultError(e);
	}
};

export const addPayrollService = async (payload = {}) => {
	try {
		let request = addPayroll_dto(payload);
		const {
			data: { responseCode, data, message },
		} = await Config.post(`api/Payroll/AddPayroll`, request);
		if (responseCode === 1001) return ResponseResultSuccess(data);
		return ResponseResultError(message);
	} catch (e) {
		return ResponseResultError(e);
	}
};
