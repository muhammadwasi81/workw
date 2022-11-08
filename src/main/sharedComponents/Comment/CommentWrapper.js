import { Skeleton } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { STRINGS } from "../../../utils/base";
import { addReaction } from "../../features/feed/store/actions";
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
	loadSkeleton = false,
	showComments = true,
	isDetailViewOpen = true,
	reactionModule,
}) {
	const [comments, setComments] = useState([]);
	const dispatch = useDispatch();
	const { user } = useSelector(state => state.userSlice);
	useEffect(() => {
		setComments([...initailComments]);
	}, [JSON.stringify(initailComments)]);

	useEffect(() => {
		isCommentLoad &&
			getComments(referenceId, STRINGS.DEFAULTS.guid, module);
	}, []);

	const getComments = async (referenceId, parentId, module) => {
		const response = await getAllComment(referenceId, parentId, module);
		setComments([...response]);
	};

	if (comments.length === 0 && loadSkeleton) return <Skeleton active />;

	const handleAddReaction = id => {
		dispatch(
			addReaction({
				referenceId: id,
				reactionModule,
				reactionType: 1,
			})
		);
	};

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
			{(showComments || isDetailViewOpen) && (
				<div className="comments">
					{comments.map(
						({
							type,
							comment,
							creator = {
								designation: user.designation || "",
								name: user.name,
								image: user.userImage,
							},
							createDate = new Date(),
							id: commentID,
							referenceId,
							mentions: mentionedUser,
						}) => {
							const { designation, name, image } = creator;
							return (
								<CommentItem
									user={user}
									placeHolderReply={placeHolderReply}
									initialMentions={initialMentions}
									mentionedUser={mentionedUser}
									module={module}
									handleLike={handleAddReaction}
									comment={{
										content: comment,
										parentId: commentID,
										referenceId: referenceId,
										type,
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
			)}
		</div>
	);
}

export default CommentWrapper;
