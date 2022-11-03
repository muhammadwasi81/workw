import { createSlice, current, isPending, isRejected } from "@reduxjs/toolkit";
import {
	addLeadManager,
	addLeadManagerContact,
	addLeadManagerDetail,
	// deleteLeadManagerContact,
	getAllLeadManager,
	getAllLeadManagerContactDetail,
	getAllLeadManagerPaging,
	getLeadManagerById,
	getLeadManagerDetailById,
	getLeadManagerSectionById,
	updateLeadManager,
	updateLeadManagerContact,
	updateLeadManagerDetail,
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
	contactDataUpdating: false,
	isAssignMemberModalOpen: false,
	assignToMemberId: "",
	isSectionModalOpen: false,
	contactModal: {
		isOpen: false,
		add: false,
	},
	composeEmail: false,
};
const leadMangerSlice = createSlice({
	name: "leadManager",
	initialState,
	reducers: {
		handleAssignMemberModal(state, { payload }) {
			state.assignToMemberId = payload.id;
			state.isAssignMemberModalOpen = !state.isAssignMemberModalOpen;
		},
		handleComposeEmail(state, { payload }) {
			state.composeEmail = payload;
		},
		handleSectionDetailModal(state, { payload }) {
			state.isSectionModalOpen = !state.isSectionModalOpen;
		},
		handleContactDetailModal(state, { payload }) {
			state.contactModal.isOpen = payload.open;
			state.contactModal.add = payload.add;
		},
		handleComposer(state, { payload }) {
			const { isOpen, isEdit } = payload;
			state.isEditComposer = isEdit;
			state.isComposerOpen = isOpen;
		},
		getLeadManagerGroupDetailById(state, { payload }) {
			state.leadManagerDetail = state.leadManagersData.find(
				manager => manager.id === payload
			);
		},
		resetLeadManagerDetail(state, { payload }) {
			state.leadManagerDetail = null;
			state.isEditComposer = false;
			state.isComposerOpen = false;
		},
		resetContactDetail(state, { payload }) {
			state.contactDetail = null;
		},
		moveSection(state, { payload }) {
			const { oldListIndex, newListIndex } = payload;
			const newLists = Array.from(state.leadManagerDetail.sections);
			const [removedList] = newLists.splice(oldListIndex, 1);
			newLists.splice(newListIndex, 0, removedList);
			state.leadManagerDetail.sections = newLists;
		},
		moveDetail(state, { payload }) {
			// console.log("move detail", payload);
			const {
				oldCardIndex,
				newCardIndex,
				sourceListId,
				destListId,
			} = payload;

			// // Move within the same list
			const sourceSection = state.leadManagerDetail.sections.find(
				section => section.id === sourceListId
			);
			const destinationsSection = state.leadManagerDetail.sections.find(
				section => section.id === destListId
			);
			const sectionIndex = state.leadManagerDetail.sections.findIndex(
				section => section.id === sourceListId
			);
			sourceSection.details[0].sectionId = destinationsSection.id;
			// console.log(
			// 	"sourceSection.details",
			// 	current(sourceSection.details),
			// 	current(destinationsSection)
			// );

			if (sourceListId === destListId) {
				const newTodos = sourceSection.details;
				const [removedCard] = newTodos.splice(oldCardIndex, 1);
				newTodos.splice(newCardIndex, 0, removedCard);

				state.leadManagerDetail.sections[
					sectionIndex
				].details = newTodos;
				return;
			}
			//move todo from one section to another
			const removedTodo = sourceSection.details.splice(oldCardIndex, 1);
			destinationsSection.details.splice(newCardIndex, 0, removedTodo[0]);
		},
	},
	extraReducers: builder => {
		builder
			.addCase(addLeadManager.fulfilled, (state, { payload }) => {
				state.leadManagersData.unshift(payload.data);
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
				const { data } = payload;
				const updatedManagerIndex = state.leadManagersData.findIndex(
					manager => manager.id === data.id
				);
				state.leadManagersData[updatedManagerIndex] = data;
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
			.addCase(
				updateLeadManagerDetail.fulfilled,
				(state, { payload }) => {
					// console.log("payload updated", payload);
					// state.leadManagerSectionDetailData = payload.data;
					const sectionIndex = state.leadManagerDetail.sections.findIndex(
						section => section.id === payload.data.sectionId
					);
					const detailIndex = state.leadManagerDetail.sections[
						sectionIndex
					].details.findIndex(
						details => details.id === payload.data.id
					);
					state.leadManagerDetail.sections[sectionIndex].details[
						detailIndex
					] = payload.data;
					state.success = true;
					state.loading = false;
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
				state.contactDataUpdating = false;
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
					state.contactDataUpdating = false;
				}
			)

			.addMatcher(isPending(getAllLeadManagerContactDetail), state => {
				state.isContactDetailLoading = true;
				state.contactDetail = null;
			})
			.addMatcher(isPending(getLeadManagerById), state => {
				// state.isComposerDataLoading = true;
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
					state.contactDataUpdating = true;
					state.success = false;
					state.error = false;
				}
			)
			.addMatcher(
				isRejected(
					...[updateLeadManagerContact, addLeadManagerContact]
				),
				state => {
					state.isContactUpdated = false;
					state.contactDataUpdating = false;
					state.success = false;
					state.error = true;
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
						updateLeadManagerDetail,
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
			)
			.addMatcher(
				isRejected(
					...[
						addLeadManager,
						getAllLeadManager,
						getAllLeadManagerPaging,
						updateLeadManager,
						getLeadManagerSectionById,
						getLeadManagerById,
						addLeadManagerDetail,
						// updateLeadManagerContact,
						// addLeadManagerContact,
						updateLeadManagerDetail,
						// deleteLeadManagerContact,
					]
				),
				state => {
					state.loading = false;
					state.success = false;
					state.error = true;
					// state.contactDataUpdating = false;
				}
			);
	},
});

export const {
	handleComposer,
	moveSection,
	moveDetail,
	resetLeadManagerDetail,
	resetContactDetail,
	getLeadManagerGroupDetailById,
	handleAssignMemberModal,
	handleContactDetailModal,
	handleSectionDetailModal,
	handleComposeEmail,
} = leadMangerSlice.actions;

export default leadMangerSlice.reducer;
