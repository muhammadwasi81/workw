import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
// import { getAllChats } from "../main/features/Messenger/store/Api";
import { receiveChatMessage } from "../main/features/Messenger/store/messengerSlice";
import { servicesUrls } from "./services/baseURLS";
import { openNotification } from "./Shared/store/slice";

export const InitMessengerSocket = (dispatch, Accesstoken) => {
	const URL = `${servicesUrls.messenger}hubs/messenger`;
	let connection = new HubConnectionBuilder()
		.withUrl(URL, {
			accessTokenFactory: () => Accesstoken,
		})
		.configureLogging(LogLevel.Information)
		.build();
	connection.start().then(() => { });
	// Receive Message Listner Here
	connection.on("ReceiveMessage", data => {
		console.log(data)
		dispatch(receiveChatMessage(data));
		dispatch(openNotification({ message: `someone sent you a message ${data.message}`, playSound:true }));
	});
};
