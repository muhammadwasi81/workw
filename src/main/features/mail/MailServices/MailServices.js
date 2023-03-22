import MasterConfig from "../../../../utils/services/MasterConfig";


export const MailServices = {
    getMenuFolders: () => {
        return MasterConfig.get("api/Mailbox/GetAllMailboxFolder");
    },
    getAllEmail: (payload) => {
        return MasterConfig.post("api/Mailbox/GetAllEmail", payload);
    },
    getMailById: ({ id, folderPath }) => {
        return MasterConfig.get(`api/Mailbox/GetEmail?id=${id}&path=${folderPath}`);
    },
    composeMail: (data) => {
        return MasterConfig.post(`api/Mailbox/SendEmail`, data)
    },


    changeMailSeenFlag: ({ uid, flag, folderPath }) => {
        return MasterConfig.get(`/konnectmailbox/api/Mailbox/ChangeSeenFlagEmail?uid=${uid}&flag=${flag}&folderPath=${folderPath}`)
    },
    moveEmailToTrash: ({ id, folderPath }) => {
        return MasterConfig.get(`/konnectmailbox/api/Mailbox/MoveEmailToTrash?id=${id}&folderPath=${folderPath}`)
    },
    deleteEmail: (id) => {
        return MasterConfig.get(`/konnectmailbox/api/Mailbox/deleteemail?id=${id}`)
    },
    
}
