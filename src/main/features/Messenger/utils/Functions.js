import { MESSENGER_ENUMS } from "./Constant"

export const getMessageStatus = (chatType, statuses) => {
    if (!statuses) {
        return 1
    }
    if (chatType === MESSENGER_ENUMS.CHAT_TYPES.INDIVIDUAL_CHAT) {
        return statuses[0].status
    }
}
export const getMessageByMe = (createBy, currentUser) => {
    if (createBy === "local")
        return true
    return createBy === currentUser.id
}