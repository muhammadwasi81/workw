import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { responseCode } from "../../../../services/enums/responseCode.js";
import { getAllCustomTagById,
  addCustomTag,updateCustomTag,
  removeCustomTag,addCustomTagMember,
  getAllCustomTag, getAllCustomTagMember
} from "./action.js";

const initialState = {
  customTag: [],
  memberData: [],
  customTagMembers:null,
  loadingData: false,
  loader: false,
  addMemberModal :false,
  isMemberModalOpen: false,
  MemberId: "",
};

const customTagSlice = createSlice({
  name: "customTag",
  initialState,
  reducers: {
    customDeleted: (state, { payload }) => {
      state.customTag = state.customTag.filter((e) => e.id !== payload.id);
    },
    addMember: (state, { payload }) => {
      state.addMemberModal = payload;
    },

    handleMemberModal(state, { payload }) {
      state.MemberId = payload.id;
      state.isMemberModalOpen = !state.isMemberModalOpen;
    },

    addCustomMember: (state, { payload }) => {
      const customMember = state.customTag.map((item, i) => {
        if (item.id === payload[0].customTagId) {
          let members = [...item.members, payload[0]];
          let newItem = {
            ...item,
            members,
          };
          return newItem;
        } else {
          return item;
        }
      });
  
      state.customTag = customMember;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCustomTagById.fulfilled, (state, { payload }) => {
        state.loadingData = false;
        state.customTag = payload.data;
      })
      .addCase(getAllCustomTag.fulfilled, (state, { payload }) => {
        console.log(payload, "getAllCustomTag");
        state.customTag = payload ? payload : [];
        state.loader = false;
      })
      .addCase(addCustomTag.fulfilled, (state, { payload }) => {
        console.log(payload,"payload");
        state.loader = false;
        if (payload.responseCode === responseCode.Success)
          state.customTag.push(payload.data);
          console.log(state.customTag,"custommmmm");
      })

      .addCase(getAllCustomTagMember.fulfilled, (state, action) => {
        state.memberData = action.payload.data;
      })
      
      .addCase(addCustomTagMember.fulfilled, (state, { payload }) => {
        console.log(payload,"payloooood");
        if (state.customTagMembers) {
          if (payload.data?.length) {
            let newMembers = [...state.customTagMembers.members, payload.data[0]];
            state.customTagMembers = {
              ...state.customTagMembers,
              members: newMembers,
            };
          }
        }
      })

      .addCase(updateCustomTag.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.customTag = state.customTag.map((x) =>
          x.id === payload.data.id ? payload.data : x
        );
      })
      .addMatcher(isPending(...[addCustomTag, updateCustomTag]), (state) => {
        state.loader = true;
      })
      .addMatcher(isPending(...[getAllCustomTagById]), (state) => {
        state.loadingData = true;
      })
      .addMatcher(
        isRejected(...[getAllCustomTagById, addCustomTag, updateCustomTag]),
        (state) => {
          state.loader = false;
          state.loadingData = false;
        }
      );
  },
});

export const { customDeleted,addMember,addCustomMember,
  handleMemberModal } = customTagSlice.actions;
  
export default customTagSlice.reducer;
