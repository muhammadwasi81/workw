import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { getAllProjects } from "./actions";

const initialState = {
	projects: [],
	loadingData: false,
	loader: true,
	projectDetail: null,
};

const projectSlice = createSlice({
	name: "projects",
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder.addCase(getAllProjects.fulfilled, (state, action) => {
			state.projects = action.payload ? action.payload.data : [];
			state.loader = false;
		});

		builder
			.addMatcher(isPending(...[getAllProjects]), state => {
				state.loader = true;
			})
			.addMatcher(isRejected(...[getAllProjects]), state => {
				state.loader = false;
			});
	},
});

export const {} = projectSlice.actions;
export default projectSlice.reducer;
