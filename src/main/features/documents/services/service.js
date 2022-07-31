import { ResponseResultError, ResponseResultSuccess } from "../../../../utils/api/ResponseResult";
import Config from "../../../../utils/services/MasterConfig";
import { responseCode as responseCodeEnum } from "../../../../services/enums/responseCode";
import { STRINGS } from "../../../../utils/base";

const getAllDocument_DBO = (data) => {
	return{
		"pageNo": data.pageNo ? data.pageNo : 0,
		"pageSize": data.pageSize ? data.pageSize : 20,
		"search": data.search ? data.search : "",
		"referenceType": data.referenceType ? data.referenceType : 1,
		"referenceId": data.referenceId ? data.referenceId : STRINGS.DEFAULTS.guid,
		"parentId": data.parentId ? data.parentId : STRINGS.DEFAULTS.guid,
		"myDocuments": data.myDocuments ? data.myDocuments : true,
		"sortBy": data.sortBy ? data.sortBy : 1,
	}
}


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

export const getAllDocumentService = async (data) => {
	let request = getAllDocument_DBO(data)
	try {
		const {
			data: { responseCode, data, message },
		} = await Config.post(`api/Document/GetAllDocumentList`, request);
		if (responseCode === responseCodeEnum.Success) return ResponseResultSuccess(data);
		return ResponseResultError(message);
	} catch (e) {
		return ResponseResultError(e);
	}
};