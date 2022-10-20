import React, { useContext, useEffect } from "react";
import { Form, Button } from "antd";
import { useDispatch } from "react-redux";
import PostTitleField from "./PostTitleField";
import PostTagField from "./PostTagField";
import PostPrivacyOptions from "./PostPrivacyOptions";
import PostPreviewAttachments from "./PostPreviewAttachments";
import PostPollOptions from "./PostPollOptions";
import PostOptions from "./PostOptions";
import { getAllUser, onFeedCreateSubmitAction } from "../../../store/actions";
import { LanguageChangeContext } from "../../../../../../utils/localization/localContext/LocalContext";
import { FeedDictionary } from "../../../localization";
import { useSelector } from "react-redux";

export default function ComposerForm({ referenceType, referenceId }) {
	const { userLanguage } = useContext(LanguageChangeContext);
	const loading = useSelector(state => state.feedSlice.postCompose.loading);
	const { composer } = FeedDictionary[userLanguage];
	const { Post } = composer;
	const dispatch = useDispatch();
	const [formRef] = Form.useForm();
	useEffect(() => {
		dispatch(getAllUser({ search: "", pageNo: 1, pageSize: 20 }));
	}, []);

	return (
		<Form form={formRef}>
			<PostTitleField />
			<PostPollOptions />
			<PostPreviewAttachments />
			<PostTagField />
			<PostOptions />
			<div className="submit-wrapper">
				<PostPrivacyOptions />
				<Button
					className="post-form"
					type="submit"
					onClick={() => {
						dispatch(
							onFeedCreateSubmitAction({
								referenceType,
								referenceId,
							})
						);
					}}
					loading={loading}
				>
					{Post}
				</Button>
			</div>
		</Form>
	);
}
