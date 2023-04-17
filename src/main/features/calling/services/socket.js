import io from "socket.io-client";
import { servicesUrls } from "../../../../utils/services/baseURLS";
import { handleAddCallWindow, handleCallNotAnswer, handleIncomingCall, handleIncomingCallNotAnswer, handleOutgoingCallAccepted, handleOutgoingCallDeclined, handleOutgoingCallRinging } from "../store/slice";

export class InitializeCallingSocket {
	connection;
	classInstance;
	#dispatch;
	#navigate;
	user;
	#authToken;
	constructor(dispatch, baseURL, userSlice) {
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
		this.connection.on("connect", async() => {
			console.log("socket.id", this.connection); // x8WIv7-mJelg7on_ALbx
			await this.connection.emit("connect-workwise", { userId: this.user.id });
		  });

		await this.connection.on("send-notification", (data) => {
			this.#dispatch(handleIncomingCall({ data }));
			console.log(data, "dataINC")
			console.log(new Date(), "dataINC")

			//set timeout for 1 minute rinigng etc
			setTimeout(() => {
				this.#dispatch(handleIncomingCallNotAnswer(data.CallURL));
				console.log(new Date(), "dataINC")
			}, 30000);
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
			this.#dispatch(handleOutgoingCallAccepted({ userId: data.userId, token: this.#authToken }))

		})


		await this.connection.on("received-by-other-device", (data) => {
			console.log(data, "message_message", "received-by-other-device");
			this.#dispatch(handleIncomingCall(null))
		})
	}

	startCalling = (members) => {
	}

	acceptCall = (callInitializerId) => {
		console.log("call-accepted", callInitializerId)
		this.connection.emit("call-accepted", {callInitializerId, receiverId: this.user.id});
	}

	declineCall = (callInitializerId) => {
		console.log("call-declined", callInitializerId)
		this.connection.emit("call-declined", {callInitializerId, receiverId: this.user.id});
	}
}