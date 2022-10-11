const createChat = (data) => {
	return {
		"image": data.image ? data.image : undefined,
		"privacyId": data.privacyId ? data.privacyId : undefined,
		"name": data.name ? data.name : "",
		"referenceId": data.referenceId ? data.referenceId : undefined,
		"chatType": data.chatType ? data.chatType : undefined,
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
	getAllConversations
}