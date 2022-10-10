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

export const messengerDTO = {
    createChat
}