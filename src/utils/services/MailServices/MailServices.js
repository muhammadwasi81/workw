import AxiosConfig from "../AxiosConfig";


export const MailServices = {
    getMenuFolders: () => {
        return AxiosConfig.get("/konnectmailbox/api/Mailbox/GetAllMailboxFolder");
    },
    getAllEmail: (objData) => {
        return AxiosConfig.post("/konnectmailbox/api/Mailbox/GetAllEmail", objData);
    },
    getMailById: ({id, folderPath}) => {
        return AxiosConfig.get(`/konnectmailbox/api/Mailbox/GetEmail?id=${id}&folderPath=${folderPath}`);
    },

    changeMailSeenFlag: ({uid, flag, folderPath}) => {
        return AxiosConfig.get(`/konnectmailbox/api/Mailbox/ChangeSeenFlagEmail?uid=${uid}&flag=${flag}&folderPath=${folderPath}`)
    },
    moveEmailToTrash: ({id, folderPath}) => {
        return AxiosConfig.get(`/konnectmailbox/api/Mailbox/MoveEmailToTrash?id=${id}&folderPath=${folderPath}`)
    },
    deleteEmail: (id) => {
        return AxiosConfig.get(`/konnectmailbox/api/Mailbox/deleteemail?id=${id}`)
    },
    composeMail: (data) => {
        return AxiosConfig.get(`/konnectmailbox/api/Mailbox/SendEmail`, data)
    },
}
