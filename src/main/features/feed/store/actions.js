import { createAsyncThunk, current } from "@reduxjs/toolkit";
import { PollType, PostType } from "../utils/constants";
import ValidateCreatePost from "../utils/ValidateCreatePost";
import SavePostRequestDto from "../data/model/SavePostRequestDto";
import {
	feedFavorite,
	feedReaction,
	getAllFeedServices,
	getFeedByIdServices,
	saveCreatePost,
	savePollResponseService,
} from "../data/FeedApi";
import { ResponseType } from "../../../../utils/api/ResponseResult";
import { getAllEmployeeService } from "../../../../utils/Shared/services/services";
import { DEFAULT_GUID } from "../../../../utils/constants";
import { openNotification } from "../../../../utils/Shared/store/slice";

export const onFeedCreateSubmitAction = createAsyncThunk(
	"feedSlice/onFeedCreateSubmit",
	async ({
		referenceType = undefined,
		referenceId= DEFAULT_GUID }, { getState, rejectWithValue }) => {
		const {
			feedSlice: { postCompose },
		} = getState();
		const { type } = postCompose;
		const { ValidateDefaultPost, ValidatePollPost } = ValidateCreatePost;

		// let attactmentIds = [];
		const validation = PostType.isPollType(type)
			? ValidatePollPost(postCompose)
			: ValidateDefaultPost(postCompose);
		if (!validation.valid)
			return rejectWithValue(validation.validationResult);
		const requestDto = SavePostRequestDto(
			postCompose,
			referenceType,
			referenceId
		);

		const response = await saveCreatePost(requestDto);

		// eslint-disable-next-line default-case
		switch (response.type) {
			case ResponseType.ERROR:
				return rejectWithValue(response.errorMessage);
			case ResponseType.SUCCESS:
				return response.data;
		}
	}
);
export const sharePostOnFeed = createAsyncThunk(
	"feedSlice/sharePostOnFeed",
	async ({
		referenceType = undefined,
		referenceId= DEFAULT_GUID }, { getState, rejectWithValue, dispatch }) => {
		const {
			feedSlice: { postCompose },
		} = getState();

		const requestDto = SavePostRequestDto(
			postCompose,
			referenceType,
			referenceId
		);

		const response = await saveCreatePost(requestDto);
		// eslint-disable-next-line default-case
		switch (response.type) {
			case ResponseType.ERROR:
				return rejectWithValue(response.errorMessage);
			case ResponseType.SUCCESS:
				dispatch(openNotification({
					type: "success",
					message: "Successfully Shared on Feed"
				}))
				return response.data;
		}
	}
);

export const getAllFeed = createAsyncThunk(
	"feedSlice/getAllFeed",
	async (data, { _, rejectWithValue }) => {
		const response = await getAllFeedServices(data);

		// eslint-disable-next-line default-case
		switch (response.type) {
			case ResponseType.ERROR:
				return rejectWithValue(response.errorMessage);
			case ResponseType.SUCCESS:
				return { data: response.data, pageNo: data.pageNo };
		}
	}
);

export const addReaction = createAsyncThunk(
	"feedSlice/addPostReaction",
	async (data, { _, rejectWithValue }) => {
		const response = await feedReaction(data);

		// eslint-disable-next-line default-case
		switch (response.type) {
			case ResponseType.ERROR:
				return rejectWithValue(response.errorMessage);
			case ResponseType.SUCCESS:
				return response.data;
		}
	}
);
export const favoriteFeed = createAsyncThunk(
	"feedSlice/addPostReaction",
	async (data, { _, rejectWithValue }) => {
		const response = await feedFavorite(data);

		// eslint-disable-next-line default-case
		switch (response.type) {
			case ResponseType.ERROR:
				return rejectWithValue(response.errorMessage);
			case ResponseType.SUCCESS:
				return { data: response.data, id: data.id };
		}
	}
);
export const savePollResponse = createAsyncThunk(
	"",
	async (data, { _, rejectWithValue }) => {
		const response = await savePollResponseService(data);

		// eslint-disable-next-line default-case
		switch (response.type) {
			case ResponseType.ERROR:
				return rejectWithValue(response.errorMessage);
			case ResponseType.SUCCESS:
				return response.data;
		}
	}
);
export const getFeedById = createAsyncThunk(
	"feedSlice/getFeedById",
	async (data, { _, rejectWithValue }) => {
		const response = await getFeedByIdServices(data);

		// eslint-disable-next-line default-case
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
	// if (type === PostType.DEFAULT) state.postCompose.title = value;
	// else if (type === PostType.POLL) state.postCompose.pollTitle = value;
	state.postCompose.title = value
	state.postCompose.pollTitle = value
}

function onPostMention(state, { payload }) {
	state.postCompose.mentions = [...state.postCompose.mentions, payload];
}

function onPostTagsChange(state, { payload }) {
	console.log(payload);
	state.postCompose.tags = payload;
}

function addPostAttachment(state, { payload: { files } }) {
	const arr = Array.from(files);

	if (Array.isArray(arr)) {
		state.postCompose.attachments = [
			...state.postCompose.attachments,
			...arr.map(file => {
				return {
					id: DEFAULT_GUID,
					file,
				};
			}),
		];
	} else {
		state.postCompose.attachments.push({
			id: DEFAULT_GUID,
			file: files[0],
		});
	}
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
function onSaveComment(state, { payload: { comment } }) {
	// console.log("payload", comment);
	const { referenceId } = comment;
	let {
		allFeed: { posts },
		singlePost,
	} = current(state);

	const AllPost = [...posts];
	const index = posts.findIndex(item => item.id === referenceId);
	const commentedPost = { ...AllPost[index] };
	commentedPost.commentCount += 1;
	commentedPost.comments = [comment, ...commentedPost.comments];
	AllPost[index] = commentedPost;
	if (singlePost.id === referenceId) {
		const post = { ...singlePost };
		post.commentCount += 1;
		post.comments = [comment, ...post.comments];
		state.singlePost = post;
	}
	state.allFeed.posts = AllPost;
}
function onPostPollAttachmentChange(state, { payload: { index, files } }) {
	if (!files.length) return;
	const {
		postCompose: {
			poll: { options },
		},
	} = current(state);

	const currentOptions = options.map(option => {
		return { ...option, type: PollType.PICTURE };
	});

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

function clearSinglePost(state, _) {
	state.singlePost = {};
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
	onSaveComment,
	toggleComposerVisibility,
	clearSinglePost
};
