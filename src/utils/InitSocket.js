import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
// import { getAllChats } from "../main/features/Messenger/store/Api";
import { receiveChatMessage } from "../main/features/Messenger/store/messengerSlice";
import { servicesUrls } from "./services/baseURLS";

// const StoreDispatch = null;

export const InitMessengerSocket = (dispatch, Accesstoken) => {
	// dispatch(getAllChats());
	const URL = `${servicesUrls.messenger}hubs/messenger`;
	let connection = new HubConnectionBuilder()
		.withUrl(URL, {
			accessTokenFactory: () => Accesstoken,
		})
		.configureLogging(LogLevel.Information)
		.build();
	connection.start().then(() => {});
	connection.on("ReceiveMessage", data => {
		dispatch(receiveChatMessage(data));
	});
};
