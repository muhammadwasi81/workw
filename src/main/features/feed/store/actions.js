import {createAsyncThunk} from "@reduxjs/toolkit";

export function onFeedTitleTextChange(state, {payload}) {
    console.log("MY_LOG_TITLE_CHANGE", payload)
    state.feedCompose.feedTitle = payload.value
}

export function onFeedAddMention(state, {payload}) {
    console.log("MY_LOG_MENTION", payload)
    state.feedCompose.feedMentions = [...state.feedCompose.feedMentions, payload]
}

export const onFeedCreateSubmitAction = createAsyncThunk("feedSlice/onFeedCreateSubmit", async (_, {getState}) => {
    const {feedSlice: {feedCompose}} = getState()
    const createFeedRequest = createFeedComposeServerObject(feedCompose)
    console.log("MY_LOG_SUBMIT", createFeedRequest)
})

function createFeedComposeServerObject({feedTitle, feedMentions}) {
    const {title, mentionsFoundInTitle} = replaceMentionNamesWithMentionId(feedTitle, feedMentions)
    return {
        title: title,
        mentions: mentionsFoundInTitle
    }
}

function replaceMentionNamesWithMentionId(title, mentions) {
    const mentionsFoundInTitle = []
    mentions.forEach(({key, value}) => {
        const regex = `@${value}`
        if (!title.includes(regex)) return false;

        const regexExpression = new RegExp(regex, 'g');
        title = title.replace(regexExpression, key)
        mentionsFoundInTitle.push(key)
    })
    return {title, mentionsFoundInTitle}
}