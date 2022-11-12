import React, { useContext, useEffect, forwardRef } from "react";
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

const ComposerForm = ({
	referenceType,
	referenceId,
	imageVideoRef,
	pollRef,
	docsRef,
}) => {
	const { userLanguage } = useContext(LanguageChangeContext);
	const loading = useSelector(state => state.feedSlice.postCompose.loading);
	const { composer } = FeedDictionary[userLanguage];
	const { Post } = composer;
	const dispatch = useDispatch();
	const [formRef] = Form.useForm();
	useEffect(() => {
		dispatch(getAllUser({ search: "", pageNo: 1, pageSize: 20 }));
	}, []);

	// // console.log("ref", ref);
	// const {} = ref;

	return (
		<Form form={formRef}>
			<PostTitleField />
			<PostPollOptions />
			<PostPreviewAttachments />
			<PostTagField />
			<PostOptions
				imageVideoRef={imageVideoRef}
				pollRef={pollRef}
				docsRef={docsRef}
			/>
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
};
export default ComposerForm;
