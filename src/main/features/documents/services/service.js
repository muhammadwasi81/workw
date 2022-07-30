import { ResponseResultError, ResponseResultSuccess } from "../../../../utils/api/ResponseResult";
import Config from "../../../../utils/services/MasterConfig";
import { responseCode as responseCodeEnum } from "../../../../services/enums/responseCode";

export const addDocumentService = async (request) => {
	try {
		const {
			data: { responseCode, data, message },
		} = await Config.post(`api/Document/AddDocument`, request);
		if (responseCode === responseCodeEnum.Success) return ResponseResultSuccess(data);
		return ResponseResultError(message);
	} catch (e) {
		return ResponseResultError(e);
	}
};

export const getAllDocumentService = async () => {
	try {
		const {
			data: { responseCode, data, message },
		} = await Config.get(`api/Document/GetAllDocument`);
		if (responseCode === responseCodeEnum.Success) return ResponseResultSuccess(data);
		return ResponseResultError(message);
	} catch (e) {
		return ResponseResultError(e);
	}
};