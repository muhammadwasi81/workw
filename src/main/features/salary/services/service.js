import { ResponseResultError, ResponseResultSuccess } from "../../../../utils/api/ResponseResult";
import Config from "../../../../utils/services/MasterConfig";

const getAllEmployeeSalary_dto = (data) => {
	return {
		"pageNo": data.pageNo ? data.pageNo : 0,
		"pageSize": data.pageSize ? data.pageSize : 20,
		"search": data.search ? data.search : "",
		"approverStatus": data.approverStatus ? data.approverStatus : [],
		"sortBy": data.sortBy ? data.sortBy : 0,
		"filterType": data.filterType ? data.filterType : 0
	}
}
const addMultipleEmployeeSalary_dto = (data = []) => {
	return data.map((item) => ({
		"userId": data.userId ? data.userId : null,
		"basicSalary": data.basicSalary ? data.basicSalary : 0,
		"description":  data.description ? data.description : "",
		"netSalary": data.netSalary ? data.netSalary : 0,
		"effectiveDate":  data.effectiveDate ? data.effectiveDate : null,
		"approvers": item.approvers ? item.approvers.map((approver)=>({
			"approverId": approver.approverId ? approver.approverId : ""
		})) : [],
		"details": item.details ? item.details.map((detail)=>({
			"allowanceId": detail.allowanceId ? detail.allowanceId : "",
			"allowance": detail.allowance ? detail.allowance : 0
		})) : [],
	}))
}


export const addMultipleEmployeeSalaryService = async (payload) => {
	try {
		let request = addMultipleEmployeeSalary_dto(payload);
		const {
			data: { responseCode, data, message },
		} = await Config.post(`api/EmployeeSalary/addEmployeeSalary`, request);
		if (responseCode === 1001) return ResponseResultSuccess(data);
		return ResponseResultError(message);
	} catch (e) {
		return ResponseResultError(e);
	}
};

export const getEmployeeSalaryDetailService = async (id) => {
	try {
		const {
			data: { responseCode, data, message },
		} = await Config.get(`api/EmployeeSalary/GetEmployeeSalaryById?id=${id}`);
		if (responseCode === 1001) return ResponseResultSuccess(data);
		return ResponseResultError(message);
	} catch (e) {
		return ResponseResultError(e);
	}
};

export const getAllEmployeeSalaryService = async (payload = {}) => {
	try {
		let request = getAllEmployeeSalary_dto(payload);
		const {
			data: { responseCode, data, message },
		} = await Config.post(`api/EmployeeSalary/GetAllEmployeeSalary`, request);
		if (responseCode === 1001) return ResponseResultSuccess(data);
		return ResponseResultError(message);
	} catch (e) {
		return ResponseResultError(e);
	}
};