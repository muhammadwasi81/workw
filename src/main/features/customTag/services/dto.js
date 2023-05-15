export const getCustomTag_dto = (data) => {
    return {
        "pageNo": data.pageNo ? data.pageNo : 1,
        "pageSize": data.pageSize ? data.pageSize : 20,
        "search": data.search ? data.search : "",
        "sortBy": data.sortBy ? data.sortBy : 1,
    }
}