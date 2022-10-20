import {
	createSlice,
	isFulfilled,
	isPending,
	isRejected,
} from "@reduxjs/toolkit";
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
	onPostPrivacyChange,
	toggleComposerVisibility,
	onSaveComment,
	getAllFeed,
	getAllUser,
	getFeedById,
	clearSinglePost,
	savePollResponse,
	favoriteFeed,
} from "./actions";
import { PollType, PostPrivacyType, PostType } from "../utils/constants";

const composeInitialState = {
	showComposer: false,
	loading: false,
	privacyType: PostPrivacyType.PUBLIC,
	type: PostType.DEFAULT,
	title: "",
	pollTitle: "",
	mentions: [],
	tags: [],
	attachments: [],
	poll: {
		options: [
			{ type: PollType.DEFAULT, value: "", attachment: null },
			{ type: PollType.DEFAULT, value: "", attachment: null },
		],
	},
};
const allFeedInitialState = {
	posts: [],
	loading: false,
};

export const feedSlice = createSlice({
	name: "feedSlice",
	initialState: {
		loading: false,
		allFeed: { ...allFeedInitialState },
		singlePost: {},
		tagsOptions: [],
		mentionsOptions: [],
		postCompose: { ...composeInitialState },
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
		onPostPrivacyChange,
		toggleComposerVisibility,
		onSaveComment,
		clearSinglePost,
		addFeedFavourite(state, { payload }) {
			const feed = state.allFeed.posts.find(
				feed => feed.id === payload.id
			);
			feed.isPinnedPost = !feed.isPinnedPost;
		},
		addFeedReaction(state, { payload }) {
			const { reactionMode, referenceId, reactionType } = payload;
			const feed = state.allFeed.posts.find(
				feed => feed.id === referenceId
			);
			if (reactionMode && reactionMode === "click") {
				// feed.reactionType===reactionType
				if (feed.reactionType === reactionType) {
					feed.reactionType = 0;
					feed.reactionCount = feed.reactionCount - 1;
					return;
				}
			}
			feed.reactionCount = 1;
			feed.reactionType = reactionType;
		},
	},
	extraReducers: builder => {
		builder.addCase(
			onFeedCreateSubmitAction.fulfilled,
			(state, { payload }) => {
				state.postCompose = composeInitialState;
				state.allFeed.posts.unshift(payload);
			}
		);
		builder.addCase(favoriteFeed.fulfilled, (state, { payload }) => {
			// console.log("payload", payload);
			// const feed = state.allFeed.posts.find(
			// 	feed => feed.id === payload.id
			// );
			// feed.isPinnedPost = !feed.isPinnedPost;
		});
		builder.addCase(onFeedCreateSubmitAction.pending, (state, _) => {
			state.postCompose.loading = true;
		});
		builder.addCase(onFeedCreateSubmitAction.rejected, (state, _) => {
			state.postCompose.loading = false;
		});
		builder
			.addMatcher(isFulfilled(...[getAllFeed]), (state, { payload }) => {
				const { data, pageNo } = payload;
				let feedData = data.map((data, i) => ({
					...data,
					reactionType: 0,
				}));
				// console.log("feedData", feedData);
				if (pageNo === 1) {
					state.allFeed.posts = feedData;
				} else {
					state.allFeed.posts = state.allFeed.posts.concat(feedData);
				}
				state.allFeed.loading = false;
			})
			.addMatcher(isPending(...[getAllFeed]), state => {
				state.allFeed.loading = true;
			})
			.addMatcher(isRejected(...[getAllFeed]), state => {
				state.allFeed.loading = true;
			});
		builder
			.addMatcher(isFulfilled(...[getAllUser]), (state, { payload }) => {
				state.tagsOptions = payload;
				state.mentionsOptions = payload;
				state.loading = false;
			})
			.addMatcher(isPending(...[getAllUser]), state => {
				state.loading = true;
			})
			.addMatcher(isRejected(...[getAllUser]), state => {
				state.loading = true;
			});
		builder
			.addMatcher(isFulfilled(...[getFeedById]), (state, { payload }) => {
				state.singlePost = { ...payload, reactionType: 0 };
				state.loading = false;
			})
			.addMatcher(isPending(...[getFeedById]), state => {
				state.loading = true;
			})
			.addMatcher(isRejected(...[getFeedById]), state => {
				state.loading = true;
			});
		builder
			.addMatcher(
				isFulfilled(...[savePollResponse]),
				(state, { payload }) => {
					console.log(payload);
				}
			)
			.addMatcher(isPending(...[savePollResponse]), state => {
				state.loading = true;
			})
			.addMatcher(isRejected(...[savePollResponse]), state => {
				state.loading = true;
			});
	},
});
export const { addFeedFavourite, addFeedReaction } = feedSlice.actions;
export default feedSlice.reducer;
