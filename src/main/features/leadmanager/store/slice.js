import { createSlice, current, isPending, isRejected } from "@reduxjs/toolkit";
import {
	addLeadManager,
	getAllLeadManager,
	getAllLeadManagerPaging,
	getLeadManagerById,
	updateLeadManager,
} from "./actions";

const initialComposerData = {
	name: "",
	description: "",
	members: [],
	attachments: [],
	privacyId: 1,
	image: "",
};

const initialState = {
	success: false,
	error: false,
	loading: false,
	leadManagersData: [],
	leadMangerDetail: null,
	isComposerOpen: false,
	isEditComposer: false,
	composerData: initialComposerData,
	isComposerDataLoading: false,
};
const leadMangerSlice = createSlice({
	name: "leadManager",
	initialState,
	reducers: {
		handleComposer(state, { payload }) {
			const { isOpen, isEdit } = payload;
			if (isEdit) {
				state.isEditComposer = isEdit;
			} else {
				state.isEditComposer = false;
			}
			state.isComposerOpen = isOpen;
		},
	},
	extraReducers: builder => {
		builder
			.addCase(addLeadManager.fulfilled, (state, { payload }) => {
				state.loading = false;
				state.success = true;
			})
			.addCase(getLeadManagerById.fulfilled, (state, { payload }) => {
				state.isComposerDataLoading = false;
				state.leadMangerDetail = payload.data;
			})
			.addCase(getAllLeadManager.fulfilled, (state, { payload }) => {
				state.success = true;
				state.loading = false;
				state.leadManagersData = payload.data;
			})
			.addCase(
				getAllLeadManagerPaging.fulfilled,
				(state, { payload }) => {
					state.success = true;
					state.loading = false;
					state.leadManagersData = payload.data;
				}
			)
			.addCase(updateLeadManager.fulfilled, (state, { payload }) => {
				state.success = true;
				state.loading = false;
			})
			.addMatcher(isPending(getLeadManagerById), state => {
				state.isComposerDataLoading = true;
				state.leadMangerDetail = null;
			})
			.addMatcher(
				isPending(
					...[
						addLeadManager,
						getAllLeadManager,
						getAllLeadManagerPaging,
						updateLeadManager,
					]
				),
				state => {
					state.loader = true;
					state.success = false;
					state.error = false;
				}
			);
	},
});

export const { handleComposer } = leadMangerSlice.actions;

export default leadMangerSlice.reducer;
