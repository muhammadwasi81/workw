import {invokeAcceptCall, invokeDeclineCall, invokeRegisterCallingConnection} from "../../../utils/socket";
import {getLocalMediaStream} from "../../../utils/webrtc";

const TAG = "SOCKET_TAG"

export function minimizeCall(state, {payload}) {
    state.minimizeCall = payload.minimize;
}

export function inComingCall(state, {payload}) {
    state.inComingCall = payload.inComingCall;
    state.callData = payload.callDetails;
}

export function declineCall(payload, {getState}) {
    const {userSlice, call} = getState();
    console.log(TAG, "STATE", userSlice, call)
    const {user} = userSlice;
    const {sender_id, calling_id} = call.callData;
    invokeDeclineCall(calling_id, user.user_id, sender_id).then(() => {
        console.log(TAG, "Decline Call Invoke Successful")
    }).catch(e => {
        console.log(TAG, "Decline Call Invoke Error", e)
    })
}

export async function acceptCall(payload, {getState}) {
    const {call} = getState();
    const {sender_id, calling_id} = call.callData;

    // INVOKE REGISTER CALL CONNECTION
    const REGISTER_CALLING_CONNECTION_RESPONSE = await invokeRegisterCallingConnection(calling_id, sender_id);
    console.log(TAG, "REGISTER_CALLING_CONNECTION_RESPONSE", REGISTER_CALLING_CONNECTION_RESPONSE);

    // INVOKE ACCEPT CALL
    const ACCEPT_CALL_RESPONSE = await invokeAcceptCall(calling_id, sender_id, REGISTER_CALLING_CONNECTION_RESPONSE.users.map(({id}) => ({id})));
    console.log(TAG, "ACCEPT_CALL_RESPONSE", ACCEPT_CALL_RESPONSE);

    // SET LOCAL STREAM
    getLocalMediaStream({audio: true, video: true}, localStream => {
        console.log(TAG, "LOCAL_STREAM", localStream);
    })

    // SET MEMBERS
    // CREATE PEERS OF MEMBERS
}