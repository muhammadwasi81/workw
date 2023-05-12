import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { addRealTimePost } from "../main/features/feed/store/slice";
import { updateMessageDeliver } from "../main/features/Messenger/store/actions";
import {
	handleConversationIndexing,
	handleStatusUpdate,
	handleUserOnlineStatus,
	receiveChatMessage,
} from "../main/features/Messenger/store/messengerSlice";
import { servicesUrls } from "./services/baseURLS";
import { openNotification } from "./Shared/store/slice";
import { MESSENGER_ENUMS } from "../main/features/Messenger/utils/Constant";
import { logout } from "./base";

// export const InitMessengerSocket = (dispatch, userSlice) => {
// 	// console.log(userSlice, "UserSlice")
// 	// const URL = `${servicesUrls.messenger}hubs/messenger`;
// 	const URL = `${servicesUrls.master}hub/notificationHub`;
// 	let connection = new HubConnectionBuilder()
// 		.withUrl(URL, { accessTokenFactory: () => userSlice.token })
// 		.configureLogging(LogLevel.Information)
// 		.build();
// 	connection.start().then(() => { });

// 	connection.on("userActiveStatus", data => {
// 		console.log(data, "userActiveStatus")
// 		if (!!data.status) {
// 			dispatch(
// 				openNotification({
// 					message: `${data.user.name} is online`,
// 					avatarName: data.user.name,
// 					avatarImage: data.user.image,
// 					style: { backgroundColor: "#ffb70b", color: "black" }
// 				})
// 			);
// 		}
// 		dispatch(
// 			handleUserOnlineStatus(data))
// 	});
// 	// Receive Message Listner Here
// 	connection.on("messageOut", data => {
// 		console.log(data, "messageOut mySocket");
// 		if (data.creator.id !== userSlice.user.id) {
// 			dispatch(
// 				updateMessageDeliver({
// 					chatId: data.chatId,
// 					msgIds: [data.id],
// 					// the reason of hardly pass deliver status is 
// 					// this listner will only fire of delivered case
// 					status: MESSENGER_ENUMS.MESSAGE_STATUS.DELIVERED
// 				})
// 			);
// 			dispatch(
// 				openNotification({
// 					message: `${data.creator.name} sent you a message ${data.message}`,
// 					playSound: true,
// 					avatarName: data.creator.name,
// 					avatarImage: data.creator.image,
// 				})
// 			);
// 		}
// 		dispatch(receiveChatMessage(data));
// 	});
// 	connection.on("notificationOut", data => {
// 		console.log(data, "notificationOut");
// 		dispatch(
// 			openNotification({
// 				message: `${data.fromUser.name} ${data.message}`,
// 				playSound: true,
// 				avatarName: data.fromUser.name,
// 				avatarImage: data.fromUser.image,
// 				style: { backgroundColor: "#64c4b2" }
// 			})
// 		);
// 	});
// 	connection.on("ConversationOut", data => {
// 		dispatch(handleConversationIndexing(data))
// 	});
// 	connection.on("newFeedOut", data => {
// 		dispatch(addRealTimePost(data))
// 	});
// 	connection.on("chatMessageStatusOut", data => {
// 		console.log(data, "chatMessageStatusOut")
// 		if (data) {
// 			data.forEach((messageItem) => dispatch(handleStatusUpdate(messageItem)))
// 		}
// 	});

// };


const handleNotificationDetail = (notificationItem, dispatch) => {
	switch (notificationItem.featureType) {
	// working in process
		case 1:
			dispatch(notificationItem.details)
			break;

		default:
			break;
	}
}


export class InitializeSocket {
	connection;
	classInstance;
	#dispatch;
	user;
	constructor(dispatch, userSlice) {
		this.#dispatch = dispatch;
		this.user = userSlice;
		this.initializeConnection();
	}

	static getInstance = (dispatch, user) => {
		if (!this.classInstance) {
			this.classInstance = new InitializeSocket(dispatch, user);
			return this.classInstance;
		}
		else
			return this.classInstance;
	}

	initializeConnection = async () => {
		const URL = `${servicesUrls.master}hub/notificationHub`;
		let connection = new HubConnectionBuilder()
			.withUrl(URL, { accessTokenFactory: () => this.user.token }).configureLogging(LogLevel.Information).build();
		this.connection = connection;
		// Start connection here...
		await connection.start().then(() => { });
		this.#onAppLoad();
	}

	#onAppLoad = async () => {

		// Receive Message Listner Here
		this.connection.on("messageOut", data => {
			console.log(data, "messageOut mySocket");
			if (data.creator.id !== this.user.user.id) {
				this.#dispatch(
					updateMessageDeliver({
						chatId: data.chatId,
						msgIds: [data.id],
						// the reason of hardly pass deliver status is 
						// this listner will only fire of delivered case
						status: MESSENGER_ENUMS.MESSAGE_STATUS.DELIVERED
					})
				);
				this.#dispatch(
					openNotification({
						message: `${data.creator.name} sent you a message ${data.message}`,
						playSound: true,
						avatarName: data.creator.name,
						avatarImage: data.creator.image,
					})
				);
			}
			this.#dispatch(receiveChatMessage(data));
		});

		this.connection.on("userActiveStatus", data => {
			if (!!data.status) {
				this.#dispatch(
					openNotification({
						message: `${data.user.name} is online`,
						avatarName: data.user.name,
						avatarImage: data.user.image,
						style: { backgroundColor: "#ffb70b", color: "black" }
					})
				);
			}
			this.#dispatch(handleUserOnlineStatus(data))
		});

		this.connection.on("notificationOut", data => {
			console.log(data, "notificationOut");
			handleNotificationDetail(data, this.#dispatch)
			this.#dispatch(
				openNotification({
					message: `${data.fromUser.name} ${data.message}`,
					playSound: true,
					avatarName: data.fromUser.name,
					avatarImage: data.fromUser.image,
					style: { backgroundColor: "#64c4b2" }
				})
			);
		});
		this.connection.on("ConversationOut", data => {
			this.#dispatch(handleConversationIndexing(data))
		});
		this.connection.on("newFeedOut", data => {
			this.#dispatch(addRealTimePost(data))
		});
		this.connection.on("chatMessageStatusOut", data => {
			console.log(data, "chatMessageStatusOut")
			if (data) {
				data.forEach((messageItem) => this.#dispatch(handleStatusUpdate(messageItem)))
			}
		});


		this.connection.on("chatTypingStatus", data => {
			console.log(data, "chatMessageTypingStatus")
		});

		this.connection.on("logoutDevice", data => {
			logout()
		});

		this.connection.on("commentOut", data => {
			console.log(data, "commentOut")
		});

		this.connection.on("likeOut", data => {
			console.log(data, "commentOut")
		});

	}

	chatMessageTypingAction = async (chatId, type) => {
		console.log("chatMessageTypingStatus", "payload", chatId, type)
		this.connection.invoke("chatMessageTypingStatus", chatId, type)
			.then((res) => console.log("chatMessageTypingStatus", res))
			.catch((err) => console.log("chatMessageTypingStatus", err))
	}
}


