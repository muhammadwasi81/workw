import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { responseCode } from "../../../../services/enums/responseCode.js";
import { getAllCustomTagById,
  addCustomTag,updateCustomTag,
  removeCustomTag,addCustomTagMember,getAllCustomTag
} 
  from "./action.js";

const initialState = {
 customTag: [],
  loadingData: false,
  loader: false,
  addMemberModal :false,
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCustomTagById.fulfilled, (state, { payload }) => {
        state.loadingData = false;
        state.customTag = payload.data;
      })

      .addCase(getAllCustomTag.fulfilled, (state, { payload }) => {
        state.loadingData = false;
        state.customTag = payload.data;
      })
      .addCase(addCustomTag.fulfilled, (state, { payload }) => {
        console.log(payload,"payload");
        state.loader = false;
        if (payload.responseCode === responseCode.Success)
          state.customTag.push(payload.data);
          console.log(state.customTag,"custommmmm");
      })
      .addCase(addCustomTagMember.fulfilled, (state, { payload }) => {
        if (state.customTag) {
          if (payload.data?.length) {
            let newMembers = [...state.customTag.members, payload.data[0]];
            state.customTag = {
              ...state.customTag,
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

export const { customDeleted,addMember } = customTagSlice.actions;
export default customTagSlice.reducer;
