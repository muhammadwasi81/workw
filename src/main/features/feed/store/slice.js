import {createSlice} from "@reduxjs/toolkit";
import {onFeedTitleTextChange, onFeedAddMention, onFeedCreateSubmitAction} from "./actions"

export const feedSlice = createSlice({
  name: "feedSlice",
  initialState: {
    feedCompose: {
      feedType: 0,
      feedTitle: "",
      feedMentions: []
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
    onFeedTitleTextChange, onFeedAddMention
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