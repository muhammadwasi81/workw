import { ResponseResultError, ResponseResultSuccess } from "../../../../utils/api/ResponseResult";
import Config from "../../../../utils/services/MasterConfig";
import { responseCode as responseCodeEnum } from "../../../../services/enums/responseCode";
import { STRINGS } from "../../../../utils/base";

const getAllDocumentList_DBO = (data) => {
	return {
		"pageNo": data.pageNo ? data.pageNo : 1,
		"pageSize": data.pageSize ? data.pageSize : 20,
		"search": data.search ? data.search : "",
		"referenceType": data.referenceType ? data.referenceType : 1,
		"referenceId": data.referenceId ? data.referenceId : STRINGS.DEFAULTS.guid,
		"parentId": data.parentId ? data.parentId : STRINGS.DEFAULTS.guid,
		"myDocuments": data.myDocuments ? data.myDocuments : false,
		"sortBy": data.sortBy ? data.sortBy : 0,
	}
}

const getAllDocument_DBO = (data) => {
	return {
		"pageNo": data.pageNo ? data.pageNo : 0,
		"pageSize": data.pageSize ? data.pageSize : 20,
		"search": data.search ? data.search : "",
		"referenceId": data.referenceId ? data.referenceId : STRINGS.DEFAULTS.guid,
		"parentId": data.parentId ? data.parentId : STRINGS.DEFAULTS.guid,
		"referenceType": data.referenceType ? data.referenceType : 1,
		"sortBy": data.sortBy ? data.sortBy : 0,
		"filterType": data.filterType ? data.filterType : 0,
	}
}
const moveDocument_DBO = (data) => {
	return {
		"parentId": data.parentId ? data.parentId : STRINGS.DEFAULTS.guid,
		"documents": data.documents ? data.documents : []
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

export const moveDocumentService = async (payload) => {
	console.log(payload)
	let request = moveDocument_DBO(payload);
	try {
		const {
			data: { responseCode, data, message },
		} = await Config.post(`api/Document/MoveDocument`, request);
		if (responseCode === responseCodeEnum.Success) return ResponseResultSuccess(data);
		return ResponseResultError(message);
	} catch (e) {
		return ResponseResultError(e);
	}
};


export const getAllDocumentListService = async (data) => {
	let request = getAllDocumentList_DBO(data)
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

export const getAllDocumentService = async (data) => {
	let request = getAllDocument_DBO(data);
	try {
		const {
			data: { responseCode, data, message },
		} = await Config.post(`api/Document/GetAllDocument`, request);
		if (responseCode === responseCodeEnum.Success) return ResponseResultSuccess(data);
		return ResponseResultError(message);
	} catch (e) {
		return ResponseResultError(e);
	}
};

export const getDocumentByIdService = async (documentId) => {
	try {
		const {
			data: { responseCode, data, message },
		} = await Config.get(`api/Document/GetDocumentById?id=${documentId}`);
		if (responseCode === responseCodeEnum.Success) return ResponseResultSuccess(data);
		return ResponseResultError(message);
	} catch (e) {
		return ResponseResultError(e);
	}
};