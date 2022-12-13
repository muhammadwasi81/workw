import { ResponseResultError, ResponseResultSuccess } from "../../../../utils/api/ResponseResult";
import Config from "../../../../utils/services/MasterConfig";
import { responseCode as responseCodeEnum } from "../../../../services/enums/responseCode";
import { STRINGS } from "../../../../utils/base";
import { addDirectory_dto, getAllDocumentList_dto, getAllDocument_dto } from "./dto";

const moveDocument_DBO = (data) => {
	return {
		"directoryId": data.parentId ? data.parentId : STRINGS.DEFAULTS.guid,
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
	let request = getAllDocumentList_dto(data)
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
	let request = getAllDocument_dto(data);
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



// NEW
// --=--=-=-=-=-=--=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

export const addDirectoryService = async (payload) => {
	let request = addDirectory_dto(payload);
	try {
		const {
			data: { responseCode, data, message },
		} = await Config.post(`api/Document/AddDocumentDirectory`, request);
		if (responseCode === responseCodeEnum.Success) return ResponseResultSuccess(data);
		return ResponseResultError(message);
	} catch (e) {
		return ResponseResultError(e);
	}
};