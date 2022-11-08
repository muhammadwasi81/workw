import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
// import { getAllChats } from "../main/features/Messenger/store/Api";
import { receiveChatMessage } from "../main/features/Messenger/store/messengerSlice";
import { servicesUrls } from "./services/baseURLS";
import { openNotification } from "./Shared/store/slice";

export const InitMessengerSocket = (dispatch, Accesstoken) => {
	// const URL = `${servicesUrls.messenger}hubs/messenger`;
	const URL = `${servicesUrls.master}hub/notificationHub`;
	let connection = new HubConnectionBuilder()
		.withUrl(URL, {
			accessTokenFactory: () => Accesstoken,
		})
		.configureLogging(LogLevel.Information)
		.build();
	connection.start().then(() => { });
	// Receive Message Listner Here
	connection.on("notificationOut", data => {
		console.log(data, "notificationOut mySocket")
	}),
	connection.on("messageOut", data => {
		console.log(data, "messageOut mySocket")
	}),
	connection.on("ReceiveMessage", data => {
		// console.log(data)
		dispatch(receiveChatMessage(data));
		dispatch(openNotification({
			message: `${data.messageFrom.name} sent you a message ${data.chatMessage.message}`,
			playSound: true,
			avatarName: data.messageFrom.name,
			avatarImage: data.messageFrom.image
		}));
	});
};
