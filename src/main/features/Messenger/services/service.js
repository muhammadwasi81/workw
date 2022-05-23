import Config from "../../../../utils/services/MessengerConfig";

export const getAllChatsService = () => {
	console.log("getAllChat");
	return Config.get(`api/Messenger/getAllChats`)
		.then(res => {
			return res.data;
		})
		.catch(err => {
			return err;
		});
};

export const sendMessageService = data => {
	return Config.post(`api/Messenger/SendChatMessage`, data)
		.then(res => {
			return res.data;
		})
		.catch(err => {
			return err;
		});
};

export const getAllMessageService = id => {
	return Config.get(`api/Messenger/SendChatMessage?chatId=${id}`)
		.then(res => {
			return res.data;
		})
		.catch(err => {
			return err;
		});
};
