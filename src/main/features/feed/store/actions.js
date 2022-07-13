import { createAsyncThunk, current } from "@reduxjs/toolkit";
import { PollType, PostType } from "../utils/constants";
import ValidateCreatePost from "../utils/ValidateCreatePost";
import SavePostRequestDto from "../data/model/SavePostRequestDto";
import { getAllFeedServices, saveCreatePost } from "../data/FeedApi";
import { ResponseType } from "../../../../utils/api/ResponseResult";
import {
  getAllEmployeeService,
  uploadImageService,
} from "../../../../utils/Shared/services/services";

export const onFeedCreateSubmitAction = createAsyncThunk(
  "feedSlice/onFeedCreateSubmit",
  async (_, { getState, rejectWithValue }) => {
    const {
      feedSlice: { postCompose },
    } = getState();
    const { attachments } = postCompose;
    const { type } = postCompose;
    const { ValidateDefaultPost, ValidatePollPost } = ValidateCreatePost;

    let attactmentIds = [];
    const validation = PostType.isPollType(type)
      ? ValidatePollPost(postCompose)
      : ValidateDefaultPost(postCompose);
    if (!validation.valid) return rejectWithValue(validation.validationResult);
    if (attachments.length) {
      const { data: attachmentResponse } = await uploadImageService(
        attachments
      );
      attactmentIds = attachmentResponse.data.map((attachment) => {
        return { attachmentId: attachment.id };
      });
    }
    const requestDto = SavePostRequestDto(postCompose, attactmentIds);
    const response = await saveCreatePost(requestDto);
    console.log("Api");
    switch (response.type) {
      case ResponseType.ERROR:
        return rejectWithValue(response.errorMessage);
      case ResponseType.SUCCESS:
        return response.data;
    }
  }
);

export const getAllFeed = createAsyncThunk(
  "feedSlice/getAllFeed",
  async (data, { _, rejectWithValue }) => {
    const response = await getAllFeedServices(data);

    switch (response.type) {
      case ResponseType.ERROR:
        return rejectWithValue(response.errorMessage);
      case ResponseType.SUCCESS:
        return response.data;
    }
  }
);

export const getAllUser = createAsyncThunk(
  "feedSlice/getAllUser",
  async (data, { _, rejectWithValue }) => {
    const { search, pageNo, pageSize } = data;
    const response = await getAllEmployeeService(search, pageNo, pageSize);
    if (response.responseCode === 1001) return response.data;

    return rejectWithValue(response.errorMessage);
  }
);
function toggleComposerVisibility(state, { payload: { visibility } }) {
  state.postCompose.showComposer = visibility;
}

function onPostTitleTextChange(state, { payload: { value } }) {
  const {
    postCompose: { type },
  } = current(state);
  if (type === PostType.DEFAULT) state.postCompose.title = value;
  else if (type === PostType.POLL) state.postCompose.pollTitle = value;
}

function onPostMention(state, { payload }) {
  state.postCompose.mentions = [...state.postCompose.mentions, payload];
}

function onPostTagsChange(state, { payload }) {
  console.log(payload);
  state.postCompose.tags = payload;
}

function addPostAttachment(state, { payload: { file } }) {
  state.postCompose.attachments = [...state.postCompose.attachments, file];
}

function removePostAttachment(state, { payload: { index } }) {
  const attachments = [...state.postCompose.attachments];
  attachments.splice(index, 1);
  state.postCompose.attachments = attachments;
}

function onPostTypeChange(state, { payload: { type } }) {
  state.postCompose.type = type;
}

function onPostPollOptionTextChange(state, { payload: { index, value } }) {
  const currentOptions = state.postCompose.poll.options;
  currentOptions[index] = { ...currentOptions[index], value };
  state.postCompose.poll.options = currentOptions;
}

function onPostPollAttachmentChange(state, { payload: { index, files } }) {
  if (!files.length) return;
  const {
    postCompose: {
      poll: { options },
    },
  } = current(state);
  const currentOptions = [...options];
  currentOptions[index] = { ...currentOptions[index], attachment: files[0] };
  state.postCompose.poll.options = currentOptions;
}

function addPostPollOption(state, _) {
  state.postCompose.poll.options = [
    ...state.postCompose.poll.options,
    {
      type: PollType.DEFAULT,
      value: "",
      attachment: null,
    },
  ];
}

function removePostPollOption(state, { payload: { index } }) {
  const {
    postCompose: {
      poll: { options },
    },
  } = current(state);
  const currentOptions = [...options];
  currentOptions.splice(index, 1);
  state.postCompose.poll.options = currentOptions.map((value, index) => ({
    ...value,
    placeholder: `Option ${index + 1}`,
  }));
}

function onPostPrivacyChange(state, { payload: { privacyType } }) {
  state.postCompose.privacyType = privacyType;
}

export {
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
};
