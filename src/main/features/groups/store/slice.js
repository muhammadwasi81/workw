import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { addGroup, getAllGroup, getAllProjects } from "./actions";

const initialState = {
	groups: [],
	loadingData: false,
	loader: true,
	groupDetail: null,
	success: false,
	error: false,
};

const groupSlice = createSlice({
	name: "groupSlice",
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder.addCase(getAllGroup.fulfilled, (state, { payload }) => {
			state.groups = payload.data;
			state.loader = false;
			state.success = true;
		});

		builder.addCase(addGroup.fulfilled, (state, { payload }) => {
			state.loader = false;
			state.success = true;
			state.groups.push(payload.data);
		});
		builder
			.addMatcher(isPending(...[getAllGroup, addGroup]), state => {
				state.loader = true;
				state.success = false;
				state.error = false;
			})
			.addMatcher(isRejected(...[getAllGroup]), state => {
				state.loader = false;
				state.success = false;
				state.error = true;
			});
	},
});

export const {} = groupSlice.actions;
export default groupSlice.reducer;
