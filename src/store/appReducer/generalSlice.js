import {createSlice} from "@reduxjs/toolkit";

export const generalSlice = createSlice({
    name: "general",
    initialState: {
        socketConnectionState: null
    },
    reducers: {
        setSocketConnectionStatus: (state, {payload}) => {
            state.socketConnectionState = payload.state;
        }
    },
});

export const {setSocketConnectionStatus} = generalSlice.actions;
export default generalSlice.reducer;
