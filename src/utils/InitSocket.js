import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { receiveChatMessage } from "../main/features/Messenger/store/messengerSlice";
import { servicesUrls } from "./services/baseURLS";
import { openNotification } from "./Shared/store/slice";

export const InitMessengerSocket = (dispatch, userSlice) => {
	console.log(userSlice, "UserSlice")
	// const URL = `${servicesUrls.messenger}hubs/messenger`;
	const URL = `${servicesUrls.master}hub/notificationHub`;
	let connection = new HubConnectionBuilder()
		.withUrl(URL, {
			accessTokenFactory: () => userSlice.token,
		})
		.configureLogging(LogLevel.Information)
		.build();
	connection.start().then(() => { });
	// Receive Message Listner Here
	connection.on("messageOut", data => {
		console.log(data, "messageOut mySocket")
		if (data.creator.id !== userSlice.user.id) {
			dispatch(receiveChatMessage(data));
			dispatch(openNotification({
				message: `${data.creator.name} sent you a message ${data.message}`,
				playSound: true,
				avatarName: data.creator.name,
				avatarImage: data.creator.image
			}));
		}
	});
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
