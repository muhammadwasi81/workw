import {createSlice} from "@reduxjs/toolkit";

export const responseStatusSlice = createSlice({
    name: 'responseStatus',
    initialState: {
        isProgress: false,
        isError: false,
        errorText: "",
        isSuccess: false,
        successText: "",
    },
    reducers: {
        SET_REQUEST_PROGRESS: (state) => { ///1
            return {
                // ...state,
                isProgress: true,
            }
        },
        SET_REQUEST_SUCCESS: (state, action) => { // 2
            state.isProgress = false;
            state.isError = false;
            state.errorText = "";
            state.successText = action.payload;
            state.isSuccess = true;
        },
        SET_REQUEST_FAILED: (state, action) => { // 3
            state.isProgress = false;
            state.isError = true;
            state.errorText = action.payload;
            state.successText = "";
            state.isSuccess = false;
        },
        SET_CLEARED_STATS: (state, action) => {
            state.isProgress = false;
            state.isError = false;
            state.errorText = "";
            state.isSuccess = false;
            state.successText = "";

        },
    },
})

export const {
    SET_REQUEST_PROGRESS,
    SET_REQUEST_SUCCESS,
    SET_REQUEST_FAILED,
    SET_CLEARED_STATS
} = responseStatusSlice.actions
export default responseStatusSlice.reducer;