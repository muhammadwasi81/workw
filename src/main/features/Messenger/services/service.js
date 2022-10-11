import { responseCode as responseCodeEnum } from "../../../../services/enums/responseCode";
import { ResponseResultError, ResponseResultSuccess } from "../../../../utils/api/ResponseResult";
import { jsonToFormData } from "../../../../utils/base";
import Config from "../../../../utils/services/MasterConfig";
import { messengerDTO } from "./dto";

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

const getAllChat = async (data) => {
	let request = messengerDTO.getAllConversations(data);
	try {
		const {
			data: { responseCode, data, message },
		} = await Config.post(`api/chat/getAllConversation`, request);
		if (responseCode === responseCodeEnum.Success) return ResponseResultSuccess(data);
		return ResponseResultError(message);
	} catch (e) {
		return ResponseResultError(e);
	}
};
const createChat = async (data) => {
	// let request = messengerDTO.createChat(data);
	let formDataRequest = jsonToFormData(data);
	try {
		const {
			data: { responseCode, data, message },
		} = await Config.post(`api/chat/createChat`, formDataRequest);
		if (responseCode === responseCodeEnum.Success) return ResponseResultSuccess(data);
		return ResponseResultError(message);
	} catch (e) {
		return ResponseResultError(e);
	}
};

export const MessengerService = {
	createChat,
	getAllChat
}
