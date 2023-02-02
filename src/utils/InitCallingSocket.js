import io from "socket.io-client";
import { handleIncomingCall } from "../main/features/calling/store/slice";

export class InitializeSocket {
	connection;
	classInstance;
	#dispatch;
	#navigate;
	user;

	constructor(dispatch, baseURL, userSlice) {
		this.#dispatch = dispatch;
		this.user = userSlice.user;
		this.initializeConnection(baseURL);
	}

	static getInstance = (dispatch, baseURL, user) => {
		if (!this.classInstance) {
			this.classInstance = new InitializeSocket(dispatch, baseURL, user);
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
		await this.connection.on("notify-CallInitializer", (message) => {
			console.log(message, "message");
			// socket.emit("send-notification-reply",{ message:"notification-received"} ,callInitializer);
		  })
		await this.connection.on("send-notification", (data) => {
			console.log(data);
			this.#dispatch(handleIncomingCall({
                data
              }));
			//set timeout for 1 minute rinigng etc
			this.connection.emit("send-notification-reply",  data.callInitializer.id );
		})
		
	}

	startCalling = (members) => {
		// this.connection.emit("notify-users", { members, callInitializer: this.user.id });
		
	}
}