// Constants Values
export const DEFAULT_MAX_POLL_OPTIONS = 4

// Enums
export const PostType = {
    DEFAULT: "DEFAULT",
    POLL: "POLL",
    getTitlePlaceHolder: (type) => {
        switch (type) {
            case PostType.DEFAULT:
                return "What's on your mind";
            case PostType.POLL:
                return "Ask something...";
        }
    },
    isPollType: (type) => type === PostType.POLL
}

export const PollType = {
    DEFAULT: "DEFAULT",
    PICTURE: "PICTURE"
}

export const PostPrivacyType = {
    PUBLIC: "PUBLIC",
    PRIVATE: "PRIVATE",
    getPostTypeIcon: (type) => {
        switch (type) {
            case PostPrivacyType.PUBLIC:
                return "https://konnect.im/static/media/world.f69f1142.svg"
            case PostPrivacyType.PRIVATE:
                return "https://konnect.im/static/media/padlock.35a2d6ca.svg"
        }
    }
}

// Post Create Helper Functions
function replaceMentionNamesWithMentionId(title, mentions) {
    const mentionsFoundInTitle = []
    mentions.forEach(({key, value}) => {
        const regex = `@${value}`
        if (!title.includes(regex)) return false;

        const regexExpression = new RegExp(regex, 'g');
        title = title.replace(regexExpression, key)
        mentionsFoundInTitle.push(key)
    })
    return {newTitle: title, mentionsFoundInTitle}
}

function createFeedComposeServerObject({title, mentions, tags}) {
    const {newTitle, mentionsFoundInTitle} = replaceMentionNamesWithMentionId(title, mentions)
    return {
        title: newTitle,
        mentions: mentionsFoundInTitle,
        tags: [...tags]
    }
}

function getPostPollOptionDefaultValue(optionNumber) {
    return ({placeholder: `Option ${optionNumber}`, value: ""})
}

// Export Functions
export {
    getPostPollOptionDefaultValue,
    createFeedComposeServerObject
}
