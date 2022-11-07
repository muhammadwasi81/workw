import React, { useContext } from "react";
import LikeIcon from "../../../../../../../content/NewContent/NewsFeed/svg/like.svg";
import CommentIcon from "../../../../../../../content/NewContent/NewsFeed/svg/comment.svg";
import ShareIcon from "../../../../../../../content/NewContent/NewsFeed/svg/share.svg";
import Reactions from "../../../../../../sharedComponents/reactionBox/index";
import { useDispatch } from "react-redux";
import { addFeedReaction, feedSlice } from "../../../../store/slice";
import { Link, useNavigate } from "react-router-dom";
import CommentWrapper from "../../../../../../sharedComponents/Comment/CommentWrapper";
import { LanguageChangeContext } from "../../../../../../../utils/localization/localContext/LocalContext";
import { FeedDictionary } from "../../../../localization";
import { ROUTES } from "../../../../../../../utils/routes";
import { ReactionType } from "../../../../utils/constants";

import {
	reactionColor,
	reactionDescription,
	reactions,
} from "../../../reactions/reactions";
import { addReaction } from "../../../../store/actions";
import { useState } from "react";

const PostFooter = ({
	attachments,
	comments = [],
	commentCount,
	reactionCount,
	id,
	isOpen,
	viewAllComments,
	referenceType,
	referenceId,
	reactionModule,
	reactionType,
}) => {
	const dispatch = useDispatch();
	let navigate = useNavigate();
	const [showComments, setShowComments] = useState(false);
	const { userLanguage } = useContext(LanguageChangeContext);
	const { Post, Direction } = FeedDictionary[userLanguage];
	const {
		Comments,
		Comment,
		Share,
		Like,
		WriteYourCommentHere,
		WriteYourReplyHere,
	} = Post;

	const handleAddReaction = (reactionType, id) => {
		if (reactionType === 0) {
			dispatch(
				addFeedReaction({
					referenceId: id,
					reactionMode: "click",
					reactionType: 1,
				})
			);
			dispatch(
				addReaction({
					referenceId: id,
					reactionModule,
					reactionType: 1,
				})
			);
			return;
		}
		dispatch(
			addFeedReaction({
				referenceId: id,
				reactionMode: "click",
				reactionType,
			})
		);
		dispatch(
			addReaction({
				referenceId: id,
				reactionModule,
				reactionType: 0,
			})
		);
	};

	return (
		<div className="post-footer">
			<div className="post-count h-[20px]">
				<div className="reactionCount">
					<span>
						<img
							src={reactions[reactionType]}
							alt={reactionDescription[reactionType]}
						/>
					</span>

					<a href={reactionCount}>{reactionCount}</a>
				</div>
				{comments?.length > 0 && (
					<div
						className="commentCount"
						onClick={() => {
							setShowComments(!showComments);
						}}
					>
						<div className="hover:underline cursor-pointer">
							{comments?.length} &nbsp;
							{comments?.length === 1 ? " Comment" : Comments}
						</div>
					</div>
				)}
			</div>
			<div className="post-events">
				<div
					className={`btn on`}
					onClick={() => handleAddReaction(reactionType, id)}
				>
					<Reactions
						direction={Direction}
						onUpdate={e => {
							dispatch(
								addFeedReaction({
									referenceId: id,
									reactionModule,
									reactionType: e,
								})
							);
							dispatch(
								addReaction({
									referenceId: id,
									reactionModule,
									reactionType: e,
								})
							);
						}}
						// onLikeBtnClick={() =>
						// 	handleAddReaction(reactionType, id)
						// }
					>
						<div className={`btn on`}>
							<span>
								<img
									className={
										ReactionType.Like === reactionType ||
										ReactionType.NoReaction === reactionType
											? "w-[20px] h-[30px]"
											: " w-[30px] h-[30px]"
									}
									src={reactions[reactionType]}
									alt={reactionDescription[reactionType]}
								/>
							</span>
							<div
								className={`text-[${reactionColor[reactionType]}]`}
								style={{ color: reactionColor[reactionType] }}
							>
								{reactionDescription[reactionType]}
							</div>
						</div>
					</Reactions>
				</div>
				<div className="btn" onClick={() => {}}>
					<div>
						<img src={CommentIcon} alt="" />
					</div>
					<div> {Comment}</div>
				</div>
				<div className="btn">
					<div>
						<img src={ShareIcon} alt="" />
					</div>
					<div> {Share}</div>
				</div>
			</div>

			<CommentWrapper
				placeHolder={WriteYourCommentHere}
				placeHolderReply={WriteYourReplyHere}
				initailComments={comments}
				referenceId={id}
				commentRequestSuccess={comment =>
					dispatch(feedSlice.actions.onSaveComment({ comment }))
				}
				showComments={showComments}
			/>
			{commentCount > 3 && (
				<p
					className="viewComments"
					onClick={() => {
						if (attachments.length > 0) isOpen(true);
						else navigate(ROUTES.NEWSFEED.LINK + id);
					}}
				>
					View All Comments
				</p>
			)}
		</div>
	);
};

export default PostFooter;
