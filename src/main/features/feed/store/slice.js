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

const fakeUsers = [{
  id: "1",
  avatar: "https://konnect.im/Upload/2020/6/44f1d99f-ef7c-40e8-a6c7-1ca8181df708.jpg",
  text: "Usman Abid",
  designation: "Web Development"
},{
  id: "2",
  avatar: "https://konnect.im/Upload/2020/6/44f1d99f-ef7c-40e8-a6c7-1ca8181df708.jpg",
  text: "Amir Naveed",
  designation: "Web Development"
},{
  id: "3",
  avatar: "https://konnect.im/Upload/2020/6/44f1d99f-ef7c-40e8-a6c7-1ca8181df708.jpg",
  text: "Owais Shaikh",
  designation: "Web Development"
},{
  id: "4",
  avatar: "https://konnect.im/Upload/2020/6/44f1d99f-ef7c-40e8-a6c7-1ca8181df708.jpg",
  text: "Owais Shaikh",
  designation: "Web Development"
},{
  id: "5",
  avatar: "https://konnect.im/Upload/2020/6/44f1d99f-ef7c-40e8-a6c7-1ca8181df708.jpg",
  text: "Owais Shaikh",
  designation: "Web Development"
},{
  id: "6",
  avatar: "https://konnect.im/Upload/2020/6/44f1d99f-ef7c-40e8-a6c7-1ca8181df708.jpg",
  text: "Owais Shaikh",
  designation: "Web Development"
},{
  id: "7",
  avatar: "https://konnect.im/Upload/2020/6/44f1d99f-ef7c-40e8-a6c7-1ca8181df708.jpg",
  text: "Owais Shaikh",
  designation: "Web Development"
},{
  id: "8",
  avatar: "https://konnect.im/Upload/2020/6/44f1d99f-ef7c-40e8-a6c7-1ca8181df708.jpg",
  text: "Owais Shaikh",
  designation: "Web Development"
},{
  id: "9",
  avatar: "https://konnect.im/Upload/2020/6/44f1d99f-ef7c-40e8-a6c7-1ca8181df708.jpg",
  text: "Owais Shaikh",
  designation: "Web Development"
},{
  id: "10",
  avatar: "https://konnect.im/Upload/2020/6/44f1d99f-ef7c-40e8-a6c7-1ca8181df708.jpg",
  text: "Owais Shaikh",
  designation: "Web Development"
},{
  id: "11",
  avatar: "https://konnect.im/Upload/2020/6/44f1d99f-ef7c-40e8-a6c7-1ca8181df708.jpg",
  text: "Owais Shaikh",
  designation: "Web Development"
},{
  id: "12",
  avatar: "https://konnect.im/Upload/2020/6/44f1d99f-ef7c-40e8-a6c7-1ca8181df708.jpg",
  text: "Owais Shaikh",
  designation: "Web Development"
},{
  id: "13",
  avatar: "https://konnect.im/Upload/2020/6/44f1d99f-ef7c-40e8-a6c7-1ca8181df708.jpg",
  text: "Owais Shaikh",
  designation: "Web Development"
},{
  id: "14",
  avatar: "https://konnect.im/Upload/2020/6/44f1d99f-ef7c-40e8-a6c7-1ca8181df708.jpg",
  text: "Owais Shaikh",
  designation: "Web Development"
},{
  id: "15",
  avatar: "https://konnect.im/Upload/2020/6/44f1d99f-ef7c-40e8-a6c7-1ca8181df708.jpg",
  text: "Owais Shaikh",
  designation: "Web Development"
}]

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
          {type: PollType.DEFAULT, value: "", attachment: null},
          {type: PollType.DEFAULT, value: "", attachment: null}
        ]
      }
    },
    mentionsOptions: fakeUsers,
    tagsOptions: fakeUsers
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