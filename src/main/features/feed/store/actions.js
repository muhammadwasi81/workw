export function onFeedTitleTextChange(state, {payload}) {
    console.log("MY_FEED_CREATE_TITLE_CHANGE", payload)
    state.feedCompose.feedTitle = payload.value
}

export function onFeedAddMention(state, {payload}) {
    console.log("MY_FEED_CREATE_ADD_MENTION", payload)
    state.feedCompose.feedMentions = [...state.feedCompose.feedMentions, payload.key]
}

export async function onFeedCreateSubmit(state, {payload}) {
    console.log("MY_FEED_CREATE_SUBMIT", state, payload)
}