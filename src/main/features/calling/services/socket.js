import io from "socket.io-client";
import { servicesUrls } from "../../../../utils/services/baseURLS";
import { handleAddCallWindow, handleIncomingCall, handleOutgoingCallAccepted, handleOutgoingCallDeclined, handleOutgoingCallRinging } from "../store/slice";

export class InitializeCallingSocket {
	connection;
	classInstance;
	#dispatch;
	#navigate;
	user;
	#authToken;
	constructor(dispatch, baseURL, userSlice) {
		console.log(userSlice)
		this.#dispatch = dispatch;
		this.user = userSlice.user;
		this.#authToken = userSlice.token;
		this.initializeConnection(baseURL);
	}

	static getInstance = (dispatch, baseURL, user) => {
		if (!this.classInstance) {
			this.classInstance = new InitializeCallingSocket(dispatch, baseURL, user);
			return this.classInstance;
		}
		else
			return this.classInstance;
	}

	initializeConnection = async (baseURL) => {
		this.connection = await io.connect(baseURL);
		this.#onAppLoad();
	}

	#onAppLoad = async () => {
		await this.connection.emit("connect-workwise", { userId: this.user.id });

		await this.connection.on("send-notification", (data) => {
			console.log(data);
			this.#dispatch(handleIncomingCall({ data }));
			//set timeout for 1 minute rinigng etc
			this.connection.emit("send-notification-reply", data.callInitializer.id);
		})

		await this.connection.on("notify-CallInitializer", (data) => {
			// FOR RINGING
			this.#dispatch(handleOutgoingCallRinging(data.userId))
		})
		await this.connection.on("notify-call-declined", (data) => {
			console.log(data, "message_message", "notify-call-declined");
			this.#dispatch(handleOutgoingCallDeclined(data.userId))
		})
		await this.connection.on("notify-call-accepted", (data) => {
			console.log(data, "message_message", "notify-call-accepted");
			// this.#dispatch(handleAddCallWindow({
			// 	callUrl: servicesUrls.callingSocket + res.data.roomId,
			// 	isOpen: true
			// }));
			this.#dispatch(handleOutgoingCallAccepted({userId: data.userId, token: this.#authToken}))
			
		})
	}

	startCalling = (members) => {
	}

	acceptCall = (callInitializerId) => {
		console.log("call-accepted", callInitializerId)
		this.connection.emit("call-accepted", callInitializerId);
	}

	declineCall = (callInitializerId) => {
		console.log("call-declined", callInitializerId)
		this.connection.emit("call-declined", callInitializerId);
	}
}