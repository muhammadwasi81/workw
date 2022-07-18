import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import {
	addBusinessPolicy,
	getAllBusinessPolicy,
} from "./action";

const initialState = {
	businessPolicies: [],
	loader: false,
	success: false,
	error: false,
};

const businessPolicySlice = createSlice({
	name: "businessPolicy",
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(addBusinessPolicy.fulfilled, (state, { payload }) => {
				// console.log("payload", payload.data);
				state.businessPolicies.push(payload.data);
				state.success = true;
				state.loader = false;
			})
			.addCase(getAllBusinessPolicy.fulfilled, (state, { payload }) => {
				console.log("payload", payload);
				state.businessPolicies = payload.data;
				state.loader = false;
			})
			.addMatcher(
				isPending(
					...[addBusinessPolicy, getAllBusinessPolicy]
				),
				state => {
					state.loader = true;
					state.success = false;
				}
			)
			.addMatcher(
				isRejected(
					...[
						addBusinessPolicy,
						getAllBusinessPolicy,
					]
				),
				state => {
					// console.log("rejected");
					state.loader = false;
					state.success = false;
					state.error = true;
				}
			);
	},
});

export default businessPolicySlice.reducer;
