import "./stylesheet/Post.css";
import PostHeader from "./views/PostHeader";
import PostSection from "./views/PostSection";
import PostFooter from "./views/PostFooter";
import { useState } from "react";

const Post = ({
	post = { attachments: [] },
	viewAllComments,
	reactionModule,
	referenceType,
	referenceId,
}) => {
	const [modelState, setmodelState] = useState(false);
	const openModel = value => {
		setmodelState(value);
	};

	const {
		id,
		creator,
		isPinnedPost,
		tags,
		createDate,
		privacyId,
		attachments,
		comments,
		commentCount,
		reactionCount,
	} = post;
	return (
		<div className="post">
			<PostHeader
				privacyId={privacyId}
				creator={creator}
				isPinnedPost={isPinnedPost}
				tags={tags}
				createDate={createDate}
			/>
			<PostSection
				post={post}
				attachments={attachments}
				isOpen={modelState}
				onOpen={openModel}
			/>
			<PostFooter
				id={id}
				comments={comments}
				reactionCount={reactionCount}
				commentCount={commentCount}
				isOpen={openModel}
				viewAllComments={viewAllComments}
				attachments={attachments}
				reactionModule={reactionModule}
				referenceType={referenceType}
				referenceId={referenceId}
			/>
		</div>
	);
};

export default Post;
