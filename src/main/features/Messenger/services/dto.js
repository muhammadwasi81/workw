import { STRINGS } from "../../../../utils/base"

const createChat = (data) => {
	return {
		"image": data.image ? data.image : undefined,
		"privacyId": data.privacyId ? data.privacyId : undefined,
		"name": data.name ? data.name : "",
		"referenceId": data.referenceId ? data.referenceId : undefined,
		"chatType": data.chatType ? data.chatType : undefined,
		"image": data.image ? data.image : undefined,
		"members": data.members ? data.members : []
	}
}
const sendMessage = (data) => {
	return {
		"chatId": data.chatId ? data.chatId : STRINGS.DEFAULTS.guid,
		"parrentId": data.parrentId ? data.parrentId : undefined,
		"message": data.message ? data.message : "",
		"referenceId": data.referenceId ? data.referenceId : undefined,
		"messageType": data.messageType ? data.messageType : 1,
		"attachments": data.attachments ? data.attachments : undefined,
		"members": data.members ? data.members : []
	}
}
const getAllConversations = (data) => {
	return {
		"pageNo": 1,
		"pageSize": 20,
		"search": ""
	}
}

export const messengerDTO = {
	createChat,
	getAllConversations,
	sendMessage
}