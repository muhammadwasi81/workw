import {
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
} from "@reduxjs/toolkit";
import {
  onFeedCreateSubmitAction,
  onPostTitleTextChange,
  onPostMention,
  onPostTagsChange,
  addPostAttachment,
  removePostAttachment,
  onPostTypeChange,
  onPostPollOptionTextChange,
  onPostPollAttachmentChange,
  addPostPollOption,
  removePostPollOption,
  onPostPrivacyChange,
  toggleComposerVisibility,
  onSaveComment,
  getAllFeed,
  getAllUser,
} from "./actions";
import { PollType, PostPrivacyType, PostType } from "../utils/constants";
const fakePost = {
  id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  parentId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  type: 1,
  title: "string",
  privacyId: 1,
  referenceType: 1,
  validTill: "2022-07-07T09:28:07.056Z",
  referenceId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  reactionCount: 0,
  commentCount: 0,
  attachmentCount: 0,
  taggedCount: 0,
  mentionCount: 0,
  voteCount: 0,
  isPinnedPost: true,
  createBy: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  createDate: "2022-07-07T09:28:07.056Z",
  mentions: [
    {
      id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      memberId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      memberType: 1,
      member: {
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        businessId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        name: "string",
        email: "string",
        image: "string",
        type: 1,
        userTypeId: 1,
        designation: "string",
      },
    },
  ],
  comments: [
    {
      id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      referenceId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      parentId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      comment: "string",
      createBy: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      createDate: "2022-07-07T09:28:07.056Z",
      type: 1,
      creator: {
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        businessId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        name: "string",
        email: "string",
        image: "string",
        type: 1,
        userTypeId: 1,
        designation: "string",
      },
      reactionCount: 0,
      replyCount: 0,
      attachmentCount: 0,
      mentionCount: 0,
      mentions: [
        {
          id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          memberId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          memberType: 1,
          member: {
            id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            businessId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            name: "string",
            email: "string",
            image: "string",
            type: 1,
            userTypeId: 1,
            designation: "string",
          },
        },
      ],
      attachments: [
        {
          id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          referenceId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          path: "string",
          attachmentName: "string",
          attachmentTypeId: 0,
          extensionTypeId: 0,
          fileSize: 0,
          duration: 0,
          width: 0,
          height: 0,
        },
      ],
      reactions: [
        {
          id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          referenceId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          reactionType: 0,
        },
      ],
    },
  ],
  tags: [
    {
      id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      memberId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      memberType: 1,
      member: {
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        businessId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        name: "string",
        email: "string",
        image: "string",
        type: 1,
        userTypeId: 1,
        designation: "string",
      },
    },
  ],
  attachments: [
    {
      id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      referenceId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      path: "string",
      attachmentName: "string",
      attachmentTypeId: 0,
      extensionTypeId: 0,
      fileSize: 0,
      duration: 0,
      width: 0,
      height: 0,
    },
  ],
  pollOptions: [
    {
      id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      option: "string",
      attachmentId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      votes: 0,
      youVoted: true,
    },
  ],
  creator: {
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    businessId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    name: "string",
    email: "string",
    image: "string",
    type: 1,
    userTypeId: 1,
    designation: "string",
  },
};
const composeInitialState = {
  showComposer: false,
  loading: false,
  privacyType: PostPrivacyType.PUBLIC,
  type: PostType.DEFAULT,
  title: "",
  pollTitle: "",
  mentions: [],
  tags: [],
  attachments: [],
  poll: {
    options: [
      { type: PollType.DEFAULT, value: "", attachment: null },
      { type: PollType.DEFAULT, value: "", attachment: null },
    ],
  },
};
const allFeedInitialState = {
  posts: [fakePost],
  loading: false,
};

export const feedSlice = createSlice({
  name: "feedSlice",
  initialState: {
    loading: false,
    allFeed: { ...allFeedInitialState },
    tagsOptions: [],
    mentionsOptions: [],
    postCompose: { ...composeInitialState },
  },
  reducers: {
    onPostTitleTextChange,
    onPostMention,
    onPostTagsChange,
    addPostAttachment,
    removePostAttachment,
    onPostTypeChange,
    onPostPollOptionTextChange,
    onPostPollAttachmentChange,
    addPostPollOption,
    removePostPollOption,
    onPostPrivacyChange,
    toggleComposerVisibility,
    onSaveComment,
  },
  extraReducers: (builder) => {
    builder.addCase(onFeedCreateSubmitAction.fulfilled, (state, _) => {
      state.postCompose = composeInitialState;
    });

    builder.addCase(onFeedCreateSubmitAction.pending, (state, _) => {
      state.postCompose.loading = true;
    });
    builder.addCase(onFeedCreateSubmitAction.rejected, (state, _) => {
      state.postCompose.loading = false;
    });
    builder
      .addMatcher(isFulfilled(...[getAllFeed]), (state, { payload }) => {
        state.allFeed.posts = payload;
        state.allFeed.loading = false;
      })
      .addMatcher(isPending(...[getAllFeed]), (state) => {
        state.allFeed.loading = true;
      })
      .addMatcher(isRejected(...[getAllFeed]), (state) => {
        state.allFeed.loading = true;
      });
    builder
      .addMatcher(isFulfilled(...[getAllUser]), (state, { payload }) => {
        state.tagsOptions = payload;
        state.mentionsOptions = payload;
        state.loading = false;
      })
      .addMatcher(isPending(...[getAllUser]), (state) => {
        state.loading = true;
      })
      .addMatcher(isRejected(...[getAllUser]), (state) => {
        state.loading = true;
      });
  },
});
export default feedSlice.reducer;
