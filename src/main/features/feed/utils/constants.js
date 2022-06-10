// Constants Values
export const DEFAULT_MAX_POLL_OPTIONS = 4

// Enums
export const PostReferenceType = {
    MAIN_FEED: 1,
    GROUP: 2,
    PROJECTS: 3,
    TIMELINE: 4
}

export const PostType = {
    DEFAULT: 1,
    POLL: 2,
    getTitlePlaceHolder: (type) => {
        switch (type) {
            case PostType.DEFAULT:
                return "What's on your mind";
            case PostType.POLL:
                return "Ask something...";
        }
    },
    isPollType: (type) => type === PostType.POLL,
}

export const PollType = {
    DEFAULT: "DEFAULT",
    PICTURE: "PICTURE"
}

export const PostPrivacyType = {
    PRIVATE: 2,
    PUBLIC: 3,
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

// Export Functions