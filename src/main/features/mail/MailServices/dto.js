export const Mail_dto = {

    getAllMail: (data = {}) => {
        return {
            "pageNo": data.pageNo ? data.pageNo : 0,
            "pageSize": data.pageSize ? data.pageSize : 20,
            "search": data.search ? data.search : "",
            "folderPath": data.folderPath ? data.folderPath : "INBOX"
        }
    },

}
