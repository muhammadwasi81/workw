import { Skeleton } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { STRINGS } from "../../../utils/base";
import CommentItem from "./commentItem";
import CommentComposer from "./Composer";
import { getAllComment } from "./services";

function CommentWrapper({
	initailComments = [],
	referenceId,
	module = 1,
	commentRequestSuccess,
	placeHolder,
	isCommentLoad = false,
	initialMentions = [],
	placeHolderReply,
}) {
	const [comments, setComments] = useState(null);
	useEffect(() => {
		if (initailComments.length > 0) setComments([...initailComments]);
	}, [initailComments]);

	useEffect(() => {
		isCommentLoad &&
			getComments(referenceId, STRINGS.DEFAULTS.guid, module);
	}, []);

	const getComments = async (referenceId, parentId, module) => {
		const response = await getAllComment(referenceId, parentId, module);
		setComments([...response]);
	};

	if (!comments) return <Skeleton active />;

	return (
		<div className="commentWrapper">
			<CommentComposer
				referenceId={referenceId}
				placeHolder={placeHolder}
				module={module}
				commentRequestSuccess={comment => {
					setComments(preValue => [...preValue, comment]);
					commentRequestSuccess && commentRequestSuccess(comment);
				}}
			/>
			<div className="comments">
				{comments.map(
					({
						comment,
						creator,
						createDate,
						id: commentID,
						referenceId,
						mentions: mentionedUser,
					}) => {
						const { designation, name, image } = creator;
						return (
							<CommentItem
								placeHolderReply={placeHolderReply}
								initialMentions={initialMentions}
								mentionedUser={mentionedUser}
								module={module}
								comment={{
									content: comment,
									parentId: commentID,
									referenceId: referenceId,
									createDate,
									youLikeType: 0,
									likeCounter: 0,
									creator: {
										name,
										image,
										designation,
									},
								}}
							/>
						);
					}
				)}
			</div>
		</div>
	);
}

export default CommentWrapper;
