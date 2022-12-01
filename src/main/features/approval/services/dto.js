
export const getAllApproval_dto = (data) => {
	return {
		"pageNo": data.pageNo ? data.pageNo : 0,
		"pageSize": data.pageSize ? data.pageSize : 20,
		"search": data.search ? data.search : "undefined",
		"status": data.status ? data.status : undefined,
		"modules": data.modules ? data.modules : undefined
	}
}