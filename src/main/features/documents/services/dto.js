import { STRINGS } from "../../../../utils/base";


export const addDirectory_dto = data => {
	return {
		name: data.name ? data.name : "",
		description: data.description ? data.description : "",
		privacyId: data.privacyId ? data.privacyId : 1,
		referenceId: data.referenceId ? data.referenceId : STRINGS.DEFAULTS.guid,
		referenceType: data.referenceType ? data.referenceType : 1,
		parentId: data.parentId ? data.parentId : STRINGS.DEFAULTS.guid,
		members: data.members ? data.members : [],
	};
};
export const getAllDocumentList_dto = (data) => {
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

export const getAllDocument_dto = (data) => {
	return {
		"pageNo": data.pageNo ? data.pageNo : 0,
		"pageSize": data.pageSize ? data.pageSize : 20,
		"search": data.search ? data.search : "",
		"referenceId": data.referenceId ? data.referenceId : STRINGS.DEFAULTS.guid,
		"parentId": data.parentId ? data.parentId : STRINGS.DEFAULTS.guid,
		"referenceType": data.referenceType ? data.referenceType : 1,
		"sortBy": data.sortBy ? data.sortBy : 1,
		"myDocuments": data.myDocuments ? data.myDocuments : false,
		"filterType": data.filterType ? data.filterType : 0,
	}
}

export const addDocument_dto = data => {
	return {
		name: data.name ? data.name : "",
		description: data.description ? data.description : "",
		privacyId: data.privacyId ? data.privacyId : 1,
		referenceId: data.referenceId
			? data.referenceId
			: STRINGS.DEFAULTS.guid,
		referenceType: data.referenceType ? data.referenceType : 1,
		directoryId: data.parentId ? data.parentId : STRINGS.DEFAULTS.guid,
		documentType: data.documentType ? data.documentType : "",
		approvers: data.approvers ? data.approvers : [],
		members: data.members ? data.members : [],
		attachments: data.attachments ? data.attachments : [],
		approvers: data.approvers ? data.approvers : [],
	};
};