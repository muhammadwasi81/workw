import $ from "jquery";
import { STRINGS } from "./base";
import { useSelector } from "react-redux";
import store from "../store/store";
import { callSlice } from "../store/appReducer/callSlice";
import { generalSlice } from "../store/appReducer/generalSlice";

window.jQuery = $;
require("ms-signalr-client-jquery-3");

const SOCKET_URL = "https://konnect.im/KonnectApiv3";
const SOCKET_CONNECTION = $.hubConnection(`${SOCKET_URL}/signalr/hubs`);
export const CHAT_PROXY = SOCKET_CONNECTION.createHubProxy("chatHub");
export const SOCKET_STATE = {
	CONNECTING: "connecting",
	CONNECTED: "connected",
	DISCONNECTED: "disconnected",
	RECONNECTING: "reconnecting",
};
export const SOCKET_ACTIONS = {
	REGISTER_USER: "registerUser",
	MESSAGES_LISTENER: "messageListner",
	LOGOUT_LISTENER: "logoutFromDevice",
	MESSAGES_STATE_LISTENER: "messageStateListner",
	USER_STATUS_LISTENER: "UserStatus",
	MESSAGE_STATE_LISTENER: "messageStateListner",
	CONVERSATIONS_LISTENER: "conversationListener",
	CHAT_IN: "chatIn",
	CHAT_OUT: "chatOut",
	NOTIFY_LISTENER: "notify",
	TYPING_LISTENER: "typingStatus",
	MESSAGES_STATUS: "messageStatus",
	COMMUNICATION_OUT: "communicationOut",
	COMMUNICATION_IN: "communicationIn",
	TESTING: "testing",
	NOTIFICATION_IN: "notificationIn",
	ACTIVITY_COUNT: "activityCount",
};

const TAG = "SOCKET_TAG";

export function Socket() {
	// console.log(TAG, "SOCKET_INIT")

	const { token } = useSelector(({ userSlice }) => userSlice);
	SOCKET_CONNECTION.start({ jsonp: true, transport: "webSockets" })
		.done(() => {
			CHAT_PROXY.invoke(STRINGS.SOCKET_ACTIONS.REGISTER_USER, {
				token,
				device_type: "web",
			});
		})
		.fail(error => console.log(TAG, error));

	SOCKET_CONNECTION.stateChanged(change => {
		if (change.newState === $.signalR.connectionState.connected) {
			store.dispatch(
				generalSlice.actions.setSocketConnectionStatus({
					state: SOCKET_STATE.CONNECTED,
				})
			);
		} else if (change.newState === $.signalR.connectionState.connecting) {
			store.dispatch(
				generalSlice.actions.setSocketConnectionStatus({
					state: SOCKET_STATE.CONNECTING,
				})
			);
		} else if (change.newState === $.signalR.connectionState.disconnected) {
			store.dispatch(
				generalSlice.actions.setSocketConnectionStatus({
					state: SOCKET_STATE.DISCONNECTED,
				})
			);
		} else if (change.newState === $.signalR.connectionState.reconnecting) {
			store.dispatch(
				generalSlice.actions.setSocketConnectionStatus({
					state: SOCKET_STATE.RECONNECTING,
				})
			);
		}
	});

	CHAT_PROXY.on(STRINGS.SOCKET_ACTIONS.COMMUNICATION_IN, response => {
		switch (response.type) {
			case STRINGS.TYPES.CALL.TYPE.INCOMING: {
				store.dispatch(
					callSlice.actions.inComingCall({
						inComingCall: true,
						callDetails: response,
					})
				);
				break;
			}
			default:
				console.log(TAG, "COMMUNICATION_IN", response);
		}
	});
}

export function invokeRegisterCallingConnection(calling_id, my_id) {
	const REGISTER_CALLING_CONNECTION_REQUEST = {
		calling_id,
		sender_id: my_id,
		chat_id: STRINGS.DEFAULTS.guid,
		type: STRINGS.TYPES.CALL.TYPE.REGISTER_CALLING_CONNECTION,
	};
	console.log(
		TAG,
		"REGISTER_CALLING_CONNECTION_REQUEST",
		REGISTER_CALLING_CONNECTION_REQUEST
	);
	return CHAT_PROXY.invoke(
		SOCKET_ACTIONS.COMMUNICATION_OUT,
		REGISTER_CALLING_CONNECTION_REQUEST
	);
}

export function invokeAcceptCall(calling_id, my_id, users) {
	const ACCEPT_CALL_REQUEST = {
		calling_id,
		users,
		sender_id: my_id,
		receiver_id: STRINGS.DEFAULTS.guid,
		mode: STRINGS.TYPES.CALL.MODE.ANSWER,
		type: STRINGS.TYPES.CALL.TYPE.CREATE_CALL_STATUS,
	};
	console.log(TAG, "ACCEPT_CALL_REQUEST", ACCEPT_CALL_REQUEST);
	return CHAT_PROXY.invoke(
		SOCKET_ACTIONS.COMMUNICATION_OUT,
		ACCEPT_CALL_REQUEST
	);
}

export function invokeDeclineCall(calling_id, my_id, receiver_id) {
	const DECLINE_CALL_REQUEST = {
		calling_id,
		receiver_id,
		sender_id: my_id,
		mode: STRINGS.TYPES.CALL.MODE.DECLINE,
		type: STRINGS.TYPES.CALL.TYPE.CREATE_CALL_STATUS,
	};
	console.log(TAG, "DECLINE_CALL_REQUEST", DECLINE_CALL_REQUEST);
	return CHAT_PROXY.invoke(
		SOCKET_ACTIONS.COMMUNICATION_OUT,
		DECLINE_CALL_REQUEST
	);
}
