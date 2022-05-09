import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { loginUser, signup, verification, getDesignation } from "./actions.js";

const initialState = {
	data: {},
	designations: [],
	loader: false,
	isSuccess: false,
};

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		clearState: (state, payload) => {
			state.isSuccess = false;
			state.isError = false;
			state.data = {};
			return state;
		},
	},
	extraReducers: builder => {
		builder
			.addCase(loginUser.fulfilled, (state, { payload }) => {
				state.data = payload;
				state.loader = false;
				state.isSuccess = true;
				return state;
			})

			.addCase(getDesignation.fulfilled, (state, { payload }) => {
				state.designations = payload;
				state.loader = false;
				return state;
			})
			// .addCase(uploadImage.fulfilled, (state, { payload }) => {
			//   state.uploadImage = false;
			// })
			.addCase(signup.fulfilled, (state, { payload }) => {
				console.log(payload, "PAYLOAD_FROM_REDUCER123");
				state.signupData = payload;
				state.loader = false;
				state.isSuccess = true;
				return state;
			})

			// .addCase(verification.pending, (state, { payload }) => {
			//   console.log(payload, "verification.pending");
			// })
			.addCase(verification.fulfilled, (state, { payload }) => {
				state.isSuccess = true;
			})
			.addCase(verification.rejected, (state, { payload }) => {
				state.isError = true;
			})

			.addMatcher(isPending(...[loginUser, signup]), state => {
				state.loader = true;
			})

			.addMatcher(
				isRejected(...[loginUser, signup]),
				(state, { payload }) => {
					state.isError = true;
					state.loader = false;
					state.loadingData = false;
				}
			);
	},
});

export const { clearState } = authSlice.actions;
export default authSlice.reducer;
