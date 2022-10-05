import Config from "../../../../utils/services/MessengerConfig";

export const getAllChatsService = () => {
	console.log("getAllChat");
	return Config.get(`api/Messenger/getAllChats`)
		.then(res => res.data)
		.catch(err => err);
};

export const sendMessageService = data => {
	return Config.post(`api/Messenger/SendChatMessage`, data)
		.then(res => res.data)
		.catch(err => err);
};

export const getAllMessageService = (id, pageNo) => {
	return Config.get(`api/Messenger/getAllChatMessages?chatId=${id}&pageNo=${pageNo}`)
		.then(res => res.data)
		.catch(err => err);
};

export const searchConversationService = (search, pageNo) => {
	return Config.get(`api/Messenger/SearchChatWithEmployeeName?search=${search}&pageNo=${pageNo}`)
		.then(res => res.data)
		.catch(err => err);
};
