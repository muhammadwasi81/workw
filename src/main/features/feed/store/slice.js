import {createSlice} from "@reduxjs/toolkit";
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
  onPostPrivacyChange
} from "./actions"
import {PollType, PostPrivacyType, PostType} from "../utils/constants";

export const feedSlice = createSlice({
  name: "feedSlice",
  initialState: {
    postCompose: {
      privacyType: PostPrivacyType.PUBLIC,
      type: PostType.DEFAULT,
      title: "",
      pollTitle: "",
      mentions: [],
      tags: [],
      attachments: [],
      poll: {
        options: [
          {placeholder: `Option 1`, value: "", type: PollType.DEFAULT, attachment: null},
          {placeholder: `Option 2`, value: "", type: PollType.DEFAULT, attachment: null}
        ]
      }
    },
    feedMentionOptions: [{
      id: "123456",
      text: "Usman Abid"
    },{
      id: "123457",
      text: "Amir Naveed"
    },{
      id: "1234568",
      text: "Owais Shaikh"
    }]
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
    onPostPrivacyChange
  },
  extraReducers: {
    [onFeedCreateSubmitAction.pending]: (state, action) => {
      console.log("onFeedCreateSubmitActionPending", state, action)
    },
    [onFeedCreateSubmitAction.rejected]: (state, action) => {
      console.log("onFeedCreateSubmitActionRejected", state, action)
    },
    [onFeedCreateSubmitAction.fulfilled]: (state, action) => {
      console.log("onFeedCreateSubmitActionFulFilled", state, action)
    }
  }
});
export default feedSlice.reducer;