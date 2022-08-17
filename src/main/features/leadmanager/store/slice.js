import { createSlice, current, isPending, isRejected } from "@reduxjs/toolkit";
import {
	addLeadManager,
	addLeadManagerContact,
	addLeadManagerDetail,
	deleteLeadManagerContact,
	getAllLeadManager,
	getAllLeadManagerContactDetail,
	getAllLeadManagerPaging,
	getLeadManagerById,
	getLeadManagerDetailById,
	getLeadManagerSectionById,
	updateLeadManager,
	updateLeadManagerContact,
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
	isContactDetailLoading: false,
	contactDetail: null,
	isContactUpdated: false,
	contactDetaUpdating: false,
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
			.addCase(
				getAllLeadManagerContactDetail.fulfilled,
				(state, { payload }) => {
					state.isContactDetailLoading = false;
					state.success = true;
					state.contactDetail = payload.data;
				}
			)
			.addCase(addLeadManagerContact.fulfilled, (state, { payload }) => {
				const { data } = payload;
				state.loading = false;
				state.success = true;
				state.leadManagerSectionDetailData.contacts.push(data);
				state.isContactUpdated = true;
				state.contactDetaUpdating = false;
				// console.log("payload data", payload.data);
			})
			.addCase(
				updateLeadManagerContact.fulfilled,
				(state, { payload }) => {
					const { data } = payload;
					state.loading = false;
					state.success = true;
					const sectionContactIndex = state.leadManagerSectionDetailData.contacts.findIndex(
						contact => contact.id === data.id
					);
					state.leadManagerSectionDetailData.contacts[
						sectionContactIndex
					] = data;

					state.isContactUpdated = true;
					state.contactDetaUpdating = false;
				}
			)

			.addMatcher(isPending(getAllLeadManagerContactDetail), state => {
				state.isContactDetailLoading = true;
				state.contactDetail = null;
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
				isPending(...[updateLeadManagerContact, addLeadManagerContact]),
				state => {
					state.isContactUpdated = false;
					// state.loading = true;
					state.success = false;
					state.contactDetaUpdating = true;
				}
			)
			.addMatcher(
				isPending(
					...[
						addLeadManager,
						getAllLeadManager,
						getAllLeadManagerPaging,
						updateLeadManager,
						getLeadManagerSectionById,
						addLeadManagerDetail,
						// updateLeadManagerContact,
						// addLeadManagerContact,
						// deleteLeadManagerContact,
					]
				),
				state => {
					state.loading = true;
					state.success = false;
					state.error = false;
				}
			);
	},
});

export const { handleComposer } = leadMangerSlice.actions;

export default leadMangerSlice.reducer;
