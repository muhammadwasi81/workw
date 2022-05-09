import { createSlice } from "@reduxjs/toolkit";
import { responseCode } from "../enums/responseCode";

const initialState = {
	success: false,
	error: false,
	message: "",
};

export const responseMessageType = Object.freeze({
	ApiSuccess: 1,
	ApiFailure: 2,
});

export const responseMessage = ({
	dispatch: dispatch,
	data: data,
	type: type,
}) => {
	// console.log("data", data);
	// console.log("type", type);
	switch (type) {
		case responseMessageType.ApiSuccess:
			if (data.responseCode === responseCode.Success) {
				dispatch(setSuccess({ message: data.message }));
				return;
			}
			// dispatch(setError({ message: data.message }));
			break;
		case responseMessageType.ApiFailure:
			dispatch(setError({ message: "Something went wrong!" }));
			break;
	}
};

const notificationSlice = createSlice({
	name: "notification",
	initialState,
	reducers: {
		setSuccess: (state, { payload }) => {
			state.success = true;
			state.message = payload.message;
		},
		resetSuccess: (state, { payload }) => {
			state.success = false;
			state.message = "";
		},
		setError: (state, { payload }) => {
			state.error = true;
			state.message = payload.message;
		},
		resetError: (state, { payload }) => {
			state.error = false;
			state.message = "";
		},
	},
});

export const { setSuccess, resetSuccess, setError, resetError } =
	notificationSlice.actions;
export default notificationSlice.reducer;
