
export const getAllApproval_dto = (data) => {
	return {
		"pageNo": data.filter.pageNo ? data.filter.pageNo : 1,
		"pageSize": data.filter.pageSize ? data.filter.pageSize : 20,
		"search": data.filter.search ? data.filter.search : "",
		"status": data.filter.status ? data.filter.status : "",
		"modules": data.filter.modules ? data.filter.modules : []
	}
}