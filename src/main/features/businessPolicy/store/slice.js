import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import {
	addBusinessPolicy,
	getAllBusinessPolicy,
	removeBusinessPolicy,
} from "./action";

const initialState = {
	businessPolicies: [],
	policyDetail: null,
	loader: false,
	success: false,
	error: false,
};

const businessPolicySlice = createSlice({
	name: "businessPolicy",
	initialState,
	reducers: {
		handleOpenDetail: (state, action) => {
			state.policyDetail = action.payload
		},
		businessDeleted: (state, { payload }) => {
			state.businessPolicies = state.businessPolicies.filter((e) => e.id !== payload);
		},
	},
	extraReducers: builder => {
		builder
			.addCase(addBusinessPolicy.fulfilled, (state, { payload }) => {
				state.businessPolicies.push(payload.data);
				state.success = true;
				state.loader = false;
			})
			.addCase(getAllBusinessPolicy.fulfilled, (state, { payload }) => {
				state.businessPolicies = payload.data;
				state.policyDetail = payload.data[0];
				state.loader = false;
			})
			.addCase(removeBusinessPolicy.fulfilled, (state, { payload }) => {
				console.log(payload, "FROM REDUCER")
				state.businessPolicies = state.businessPolicies.filter((e) => e.id !== payload.id);
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

export const { handleOpenDetail, businessDeleted } = businessPolicySlice.actions;
export default businessPolicySlice.reducer;
