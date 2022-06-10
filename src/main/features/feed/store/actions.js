import {createAsyncThunk, current} from "@reduxjs/toolkit";
import {PollType, PostType} from "../utils/constants";
import ValidateCreatePost from "../utils/ValidateCreatePost";
import SavePostRequestDto from "../data/model/SavePostRequestDto";
import {saveCreatePost} from "../data/FeedApi";
import {ResponseType} from "../../../../utils/api/ResponseResult";


export const onFeedCreateSubmitAction = createAsyncThunk("feedSlice/onFeedCreateSubmit", async (_, {getState, rejectWithValue}) => {
    const {feedSlice: {postCompose}} = getState()
    const {type} = postCompose;
    const {ValidateDefaultPost, ValidatePollPost} = ValidateCreatePost
    const validation = PostType.isPollType(type) ? ValidatePollPost(postCompose) : ValidateDefaultPost(postCompose)
    if (!validation.valid) return rejectWithValue(validation.validationResult)
    /*if (attachments.length) {
        const attachmentsResponse = await uploadFilesService(attachments);
        console.log("CREATE_POST_UPLOADING_ATTACHMENTS", attachmentsResponse)
    }*/
    const requestDto = SavePostRequestDto(postCompose)
    const response = await saveCreatePost(requestDto);
    switch (response.type) {
        case ResponseType.ERROR:
            return rejectWithValue(response.errorMessage)
        case ResponseType.SUCCESS:
            return response.data
    }
})

function onPostTitleTextChange(state, {payload: {value}}) {
    const {postCompose: {type}} = current(state)
    if (type === PostType.DEFAULT)
        state.postCompose.title = value
    else if (type === PostType.POLL)
        state.postCompose.pollTitle = value
}

function onPostMention(state, {payload}) {
    state.postCompose.mentions = [...state.postCompose.mentions, payload]
}

function onPostTagsChange(state, {payload}) {
    state.postCompose.tags = [...state.postCompose.tags, ...payload]
}

function addPostAttachment(state, {payload: {file}}) {
    state.postCompose.attachments = [...state.postCompose.attachments, file]
}

function removePostAttachment(state, {payload: {index}}) {
    const attachments = [...state.postCompose.attachments];
    attachments.splice(index, 1);
    state.postCompose.attachments = attachments
}

function onPostTypeChange(state, {payload: {type}}) {
    state.postCompose.type = type
}

function onPostPollOptionTextChange(state, {payload: {index, value}}) {
    const currentOptions = state.postCompose.poll.options
    currentOptions[index] = {...currentOptions[index], value}
    state.postCompose.poll.options = currentOptions
}

function onPostPollAttachmentChange(state, {payload: {index, file}}) {
    const {postCompose: {poll: {options}}} = current(state)
    const currentOptions = [...options]
    currentOptions[index] = {...currentOptions[index], attachment: file}
    state.postCompose.poll.options = currentOptions
}

function addPostPollOption(state, _) {
    const currentOptions = state.postCompose.poll.options
    const newOption = {value: "", placeholder: `Option ${currentOptions.length + 1}`, type: PollType.DEFAULT, attachment: null}
    state.postCompose.poll.options = [...currentOptions, newOption]
}

function removePostPollOption(state, {payload: {index}}) {
    const {postCompose: {poll: {options}}} = current(state)
    const currentOptions = [...options]
    currentOptions.splice(index, 1);
    state.postCompose.poll.options = currentOptions.map((value, index) => ({
        ...value, placeholder: `Option ${index + 1}`
    }))
}

function onPostPrivacyChange(state, {payload: {privacyType}}) {
    state.postCompose.privacyType = privacyType
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
    onPostPrivacyChange
}