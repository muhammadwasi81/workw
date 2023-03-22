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





// ++++++++++++++++++++++++++++++++++++++++++++++++++++
// New Services here
const getAllChat = async (payload) => {
	let request = messengerDTO.getAllConversations(payload);
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

const getAllEmployeeWithChat = async (payload) => {
	let request = messengerDTO.getAllConversations(payload);
	try {
		const {
			data: { responseCode, data, message },
		} = await Config.post(`api/chat/SearchConversation`, request);
		if (responseCode === responseCodeEnum.Success) return ResponseResultSuccess(data);
		return ResponseResultError(message);
	} catch (e) {
		return ResponseResultError(e);
	}
};
const getAllChatMessage = async (payload) => {
	let request = messengerDTO.getAllChatMessage(payload);
	try {
		const {
			data: { responseCode, data, message },
		} = await Config.post(`api/chat/GetAllChatMessage`, request);
		if (responseCode === responseCodeEnum.Success) return ResponseResultSuccess(data);
		return ResponseResultError(message);
	} catch (e) {
		return ResponseResultError(e);
	}
};
const createChat = async (data) => {
	let request = messengerDTO.createChat(data);
	let formDataRequest = jsonToFormData(request);
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
const sendMessage = async (payload) => {
	let request = messengerDTO.sendMessage(payload);
	let formDataRequest = jsonToFormData(request);
	try {
		const {
			data: { responseCode, data, message },
		} = await Config.post(`api/chat/sendChatMessage`, formDataRequest);

		if (responseCode === responseCodeEnum.Success) return ResponseResultSuccess(data);
		return ResponseResultError(message);
	} catch (e) {
		console.log(e);
		return ResponseResultError(e);
	}
};
const updateMessageDeliver = async (payload) => {
	let { chatId, msgIds } = payload;
	try {
		const {
			data: { responseCode, data, message },
		} = await Config.post(`api/chat/UpdateMessageDeliverStatus?id=${chatId}`, msgIds);
		if (responseCode === responseCodeEnum.Success) return ResponseResultSuccess(data);
		return ResponseResultError(message);
	} catch (e) {
		return ResponseResultError(e);
	}
};
const updateMessageSeen = async (payload) => {
	let { chatId, msgIds } = payload;
	try {
		const {
			data: { responseCode, data, message },
		} = await Config.post(`api/chat/UpdateMessageSeenStatus?id=${chatId}`, msgIds);
		if (responseCode === responseCodeEnum.Success) return ResponseResultSuccess(data);
		return ResponseResultError(message);
	} catch (e) {
		return ResponseResultError(e);
	}
};

export const MessengerService = {
	createChat,
	getAllChat,
	sendMessage,
	getAllChatMessage,
	updateMessageDeliver,
	updateMessageSeen,
	getAllEmployeeWithChat
}
