import { createSlice, current, isPending, isRejected } from "@reduxjs/toolkit";
import {
	addLeadManager,
	addLeadManagerContact,
	addLeadManagerDetail,
	getAllLeadManager,
	getAllLeadManagerPaging,
	getLeadManagerById,
	getLeadManagerDetailById,
	getLeadManagerSectionById,
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
	leadManagerDetail: null,
	leadManagerSectionDetailData: null,
	isSectionDetailLoading: false,
	isComposerOpen: false,
	isEditComposer: false,
	composerData: initialComposerData,
	isComposerDataLoading: false,
	leadManagerSections: [],
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
				// console.log("payload.data", payload.data);
				state.isComposerDataLoading = false;
				state.leadManagerDetail = payload.data;
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
			.addCase(
				getLeadManagerSectionById.fulfilled,
				(state, { payload }) => {
					state.success = true;
					state.loading = false;
					state.leadManagerSections = payload.data;
				}
			)
			.addCase(addLeadManagerDetail.fulfilled, (state, { payload }) => {
				state.success = true;
				state.loading = false;
				const { sectionId } = payload.data;
				const sectionIndex = state.leadManagerDetail.sections.findIndex(
					section => section.id === sectionId
				);
				state.leadManagerDetail.sections[sectionIndex].details.push(
					payload.data
				);
			})
			.addCase(
				getLeadManagerDetailById.fulfilled,
				(state, { payload }) => {
					state.isSectionDetailLoading = false;
					state.success = true;
					state.leadManagerSectionDetailData = payload.data;
				}
			)
			.addCase(addLeadManagerContact.fulfilled, (state, { payload }) => {
				state.loading = false;
				state.success = true;
				console.log("payload data", payload.data);
			})
			.addMatcher(isPending(getLeadManagerById), state => {
				state.isComposerDataLoading = true;
				state.leadManagerDetail = null;
			})
			.addMatcher(isPending(getLeadManagerDetailById), state => {
				state.isSectionDetailLoading = true;
				state.leadManagerSectionDetailData = null;
			})
			.addMatcher(
				isPending(
					...[
						addLeadManager,
						getAllLeadManager,
						getAllLeadManagerPaging,
						updateLeadManager,
						getLeadManagerSectionById,
						addLeadManagerDetail,
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
