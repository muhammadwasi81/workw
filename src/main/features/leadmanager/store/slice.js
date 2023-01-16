import { createSlice, isPending, isRejected } from '@reduxjs/toolkit';
import {
  addLeadManager,
  addLeadManagerAssignTo,
  addLeadManagerContact,
  addLeadManagerDetail,
  deleteLeadManagerDetailAssignTo,
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
  getAllScheduleAction,
  getScheduleByIdAction,
<<<<<<< HEAD
} from './actions';
=======
  getAllLeadManagerMember,
  addLeadManagereMember,
} from "./actions";
>>>>>>> 1c94675bbcfcb4ef86555b6b74b0738a50b946e9

const initialComposerData = {
  name: '',
  description: '',
  members: [],
  attachments: [],
  privacyId: 1,
  image: '',
};

const initialState = {
  success: false,
  error: false,
  loading: false,
  leadManagersData: [],
  memberData:[],
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

  meetingDetail: [],
  meetingDetailComposer: {},
  isMeetingDetailLoading: false,

  isContactUpdated: false,
  contactDataUpdating: false,
  isAssignMemberModalOpen: false,
  assignToMemberId: '',
  isSectionModalOpen: false,
  addMemberModal: false,
  addAssignMemberModal: false,

  contactModal: {
    isOpen: false,
    add: false,
  },
  composeEmail: false,
  drawerOpen: false,
  scheduleComposerData: null,
};
const leadMangerSlice = createSlice({
  name: 'leadManager',
  initialState,
  reducers: {
    handleOpenComposer: (state, { payload }) => {
      state.drawerOpen = payload;
    },
    addMember: (state, { payload }) => {
      state.addMemberModal = payload;
    },
    addAssignMember: (state, { payload }) => {
      state.addAssignMemberModal = payload;
    },
    toggleEventDetailComposer: (state, { payload }) => {
      state.meetingDetailComposer = !state.meetingDetailComposer;
      state.scheduleComposerData = payload;
    },
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
        (manager) => manager.id === payload
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
    resetSuccess(state, { payload }) {
      state.success = false;
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
      const { oldCardIndex, newCardIndex, sourceListId, destListId } = payload;

      // // Move within the same list
      const sourceSection = state.leadManagerDetail.sections.find(
        (section) => section.id === sourceListId
      );
      const destinationsSection = state.leadManagerDetail.sections.find(
        (section) => section.id === destListId
      );
      const sectionIndex = state.leadManagerDetail.sections.findIndex(
        (section) => section.id === sourceListId
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

        state.leadManagerDetail.sections[sectionIndex].details = newTodos;
        return;
      }
      //move todo from one section to another
      const removedTodo = sourceSection.details.splice(oldCardIndex, 1);
      destinationsSection.details.splice(newCardIndex, 0, removedTodo[0]);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addLeadManager.fulfilled, (state, { payload }) => {
        state.leadManagersData.unshift(payload.data);
        state.loading = false;
        state.success = true;
      })
      .addCase(getAllLeadManagerMember.fulfilled, (state, action) => {
        state.memberData = action.payload ? action.payload : [];
      })
      .addCase(addLeadManagereMember.fulfilled, (state, { payload }) => {
        state.memberData = [...state.memberData, payload];
        return state;
      })
      .addCase(getLeadManagerById.fulfilled, (state, { payload }) => {
        // console.log("payload.data", payload.data);
        state.isComposerDataLoading = false;
        state.leadManagerDetail = payload.data;
      })
      .addCase(getScheduleByIdAction.fulfilled, (state, { payload }) => {
        ////meetings by iddd
        state.isComposerDataLoading = false;
        state.meetingDetailComposer = payload.data;
        console.log(payload, 'payloadddd');
      })
      .addCase(getAllLeadManager.fulfilled, (state, { payload }) => {
        state.success = true;
        state.loading = false;
        state.leadManagersData = payload.data;
      })
      .addCase(getAllLeadManagerPaging.fulfilled, (state, { payload }) => {
        state.success = true;
        state.loading = false;
        state.leadManagersData = payload.data;
      })
      .addCase(updateLeadManager.fulfilled, (state, { payload }) => {
        const { data } = payload;
        const updatedManagerIndex = state.leadManagersData.findIndex(
          (manager) => manager.id === data.id
        );
        state.leadManagersData[updatedManagerIndex] = data;
        state.success = true;
        state.loading = false;
      })
      .addCase(getLeadManagerSectionById.fulfilled, (state, { payload }) => {
        state.success = true;
        state.loading = false;
        state.leadManagerSections = payload.data;
      })
      .addCase(updateLeadManagerDetail.fulfilled, (state, { payload }) => {
        // console.log("payload updated", payload);
        // state.leadManagerSectionDetailData = payload.data;
        const sectionIndex = state.leadManagerDetail.sections.findIndex(
          (section) => section.id === payload.data.sectionId
        );
        const detailIndex = state.leadManagerDetail.sections[
          sectionIndex
        ].details.findIndex((details) => details.id === payload.data.id);
        state.leadManagerDetail.sections[sectionIndex].details[detailIndex] =
          payload.data;
        state.success = true;
        state.loading = false;
      })
      .addCase(addLeadManagerDetail.fulfilled, (state, { payload }) => {
        state.success = true;
        state.loading = false;
        const { sectionId } = payload.data;
        const sectionIndex = state.leadManagerDetail.sections.findIndex(
          (section) => section.id === sectionId
        );
        state.leadManagerDetail.sections[sectionIndex].details.push(
          payload.data
        );
      })
      .addCase(getLeadManagerDetailById.fulfilled, (state, { payload }) => {
        state.isSectionDetailLoading = false;
        state.success = true;
        state.leadManagerSectionDetailData = payload.data;
      })
      .addCase(
        getAllLeadManagerContactDetail.fulfilled,
        (state, { payload }) => {
          state.isContactDetailLoading = false;
          state.success = true;
          state.contactDetail = payload.data;
        }
      )
      .addCase(addLeadManagerAssignTo.fulfilled, (state, { payload }) => {
        const { sectionId, detailId, data } = payload;
        let sectionIndex = state.leadManagerDetail.sections.findIndex(
          (section) => section.id === sectionId
        );
        let detailIndex = state.leadManagerDetail.sections[
          sectionIndex
        ].details.findIndex((detail) => detail.id === detailId);
        state.leadManagerDetail.sections[sectionIndex].details[
          detailIndex
        ].members = data;

        if (state.leadManagerSectionDetailData) {
          state.leadManagerSectionDetailData.members = data;
        }
      })
      .addCase(
        deleteLeadManagerDetailAssignTo.fulfilled,
        (state, { payload }) => {
          const { sectionId, detailId, memberId } = payload;
          let sectionIndex = state.leadManagerDetail.sections.findIndex(
            (section) => section.id === sectionId
          );
          let detailIndex = state.leadManagerDetail.sections[
            sectionIndex
          ].details.findIndex((detail) => detail.id === detailId);

          const filteredMembers = state.leadManagerDetail.sections[
            sectionIndex
          ].details[detailIndex].members.filter(
            (member) => member.memberId !== memberId
          );

          state.leadManagerDetail.sections[sectionIndex].details[
            detailIndex
          ].members = filteredMembers;
          if (state.leadManagerSectionDetailData) {
            state.leadManagerSectionDetailData.members = filteredMembers;
          }
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
      .addCase(updateLeadManagerContact.fulfilled, (state, { payload }) => {
        const { data } = payload;
        state.loading = false;
        state.success = true;
        const sectionContactIndex = state.leadManagerSectionDetailData.contacts.findIndex(
          (contact) => contact.id === data.id
        );
        state.leadManagerSectionDetailData.contacts[sectionContactIndex] = data;

        state.isContactUpdated = true;
        state.contactDataUpdating = false;
      })
      .addCase(getAllScheduleAction.fulfilled, (state, { payload }) => {
        state.isMeetingDetailLoading = false;
        state.success = true;
        state.meetingDetail = payload.data;
        //////////////////////////////////
      })
      .addMatcher(isPending(getAllLeadManagerContactDetail), (state) => {
        state.isContactDetailLoading = true;
        state.contactDetail = null;
      })
      .addMatcher(isPending(getLeadManagerById), (state) => {
        // state.isComposerDataLoading = true;
        state.leadManagerDetail = null;
      })
      .addMatcher(isPending(getLeadManagerDetailById), (state) => {
        state.isSectionDetailLoading = true;
        state.leadManagerSectionDetailData = null;
      })

      .addMatcher(
        isPending(...[updateLeadManagerContact, addLeadManagerContact]),
        (state) => {
          state.isContactUpdated = false;
          state.contactDataUpdating = true;
          state.success = false;
          state.error = false;
        }
      )
      .addMatcher(
        isRejected(...[updateLeadManagerContact, addLeadManagerContact]),
        (state) => {
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
        (state) => {
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
        (state) => {
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
  resetSuccess,
  addMember,
  addAssignMember,
  handleOpenComposer,
  toggleEventDetailComposer,
} = leadMangerSlice.actions;

export default leadMangerSlice.reducer;
