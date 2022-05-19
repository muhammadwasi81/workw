import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {onFeedCreateSubmit, onFeedTitleTextChange, onFeedAddMention} from "./actions"

export const onFeedCreateSubmitAction = createAsyncThunk("feedSlice/onFeedCreateSubmit", onFeedCreateSubmit)
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
    [onFeedCreateSubmitAction.fulfilled]: (state, _) => {
      console.log("onFeedCreateSubmitActionFulFilled", state.feedCompose)
      return state;
    }
  }
});
export default feedSlice.reducer;