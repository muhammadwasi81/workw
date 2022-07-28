// Constants Values
export const DEFAULT_MAX_POLL_OPTIONS = 4;

// Enums
export const PostReferenceType = Object.freeze({
  MAIN_FEED: 1,
  GROUP: 2,
  PROJECTS: 3,
  TIMELINE: 4,
});

export const PostType = Object.freeze({
  DEFAULT: 1,
  POLL: 2,
  getTitlePlaceHolder: (type) => {
    // eslint-disable-next-line default-case
    switch (type) {
      case PostType.DEFAULT:
        return "What's on your mind";
      case PostType.POLL:
        return "Ask something...";
    }
  },
  isPollType: (type) => type === PostType.POLL,
});

export const PollType = Object.freeze({
  DEFAULT: 1,
  PICTURE: 2,
});

export const PostPrivacyType = Object.freeze({
  PUBLIC: 1,
  PRIVATE: 2,
  EXTERNAL: 3,
  getPostTypeIcon: (type) => {
    // eslint-disable-next-line default-case
    switch (type) {
      case PostPrivacyType.PUBLIC:
        return "https://konnect.im/static/media/world.f69f1142.svg";
      case PostPrivacyType.PRIVATE:
        return "https://konnect.im/static/media/padlock.35a2d6ca.svg";
      case PostPrivacyType.EXTERNAL:
        return "https://konnect.im/static/media/padlock.35a2d6ca.svg";
    }
  },
});
