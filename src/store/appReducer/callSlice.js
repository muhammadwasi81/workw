import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {minimizeCall, inComingCall, declineCall, acceptCall} from "../../main/container/konnect_call/call_handlers"

export const declineCallAction = createAsyncThunk("call/declineCall", declineCall)
export const acceptCallAction = createAsyncThunk("call/acceptCall", acceptCall)
export const callSlice = createSlice({
    name: "call",
    initialState: {
        onCall: false,
        minimizeCall: false,
        inComingCall: false,
        callData: null,
        acceptCallPending: null
    },
    reducers: {
        minimizeCall,
        inComingCall
    },
    extraReducers: {
        [declineCallAction.fulfilled]: (state, _) => {
            state.inComingCall = false;
            state.callData = null;
            return state;
        },
        [acceptCallAction.pending]: (state, _) => {
            state.acceptCallPending = true
            return state;
        },
        [acceptCallAction.fulfilled]: (state, _) => {
            state.acceptCallPending = false
            return state;
        }
    }
});
export default callSlice.reducer;
