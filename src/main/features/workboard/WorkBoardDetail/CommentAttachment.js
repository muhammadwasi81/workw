import React, { useContext } from "react";
import CommentIcon from "../../../../content/NewContent/NewsFeed/svg/comment.svg";
import Reactions from "../../../sharedComponents/reactionBox";
import { useDispatch } from "react-redux";
import { addFeedReaction ,feedSlice } from "../../feed/store/slice";
import { useNavigate } from "react-router-dom";
import CommentWrapper from "../../../sharedComponents/Comment/CommentWrapper";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { FeedDictionary } from "../../feed/localization";
import {ROUTES } from "../../../../utils/routes";
import { ReactionType } from "../../feed/utils/constants";
import { reactionColor ,reactionDescription ,reactions} from "../../feed/ui/reactions/reactions";
import { addReaction } from "../../feed/store/actions";
import { useState } from "react";
import { RiShareForwardLine } from "react-icons/ri";
import { Popover } from "antd";
import PostShareContent from "../../feed/ui/posts_list/post/views/PostShareContent";

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
  myReaction,
  isDetailViewOpen = true,
  isDetail = false,
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
    Celebrate,
    WriteYourCommentHere,
    WriteYourReplyHere,
  } = Post;

  const handleAddReaction = (myReaction, id) => {
    if (myReaction === 0) {
      dispatch(
        addFeedReaction({
          referenceId: id,
          reactionMode: "click",
          ReactionType: myReaction,
          isDetail,
        })
      );
      dispatch(
        addReaction({
          referenceId: id,
          reactionModule,
          reactionType: myReaction,
        })
      );
      return;
    }

    dispatch(
      addFeedReaction({
        referenceId: id,
        reactionMode: "click",
        reactionType: myReaction,
        isDetail,
      })
    );
    dispatch(
      addReaction({
        referenceId: id,
        reactionModule,
        reactionType: myReaction,
      })
    );
  };

  return (
    <div className="post-footer">
      <div className="post-count h-[20px]">
        <div className="reactionCount">
          <span>
            <img
              src={reactions[myReaction]}
              alt={reactionDescription[myReaction]}
            />
          </span>
          <a href={reactionCount}>{reactionCount}</a>
        </div>
        {commentCount > 0 && (
          <div
            className="commentCount"
            onClick={() => {
              setShowComments(true);
            }}
          >
            <div className="hover:underline cursor-pointer">
              {commentCount} &nbsp;
              {commentCount === 1 ? " Comment" : Comments}
            </div>
          </div>
        )}
      </div>
      <div className="post-events">
          
        <div
          className="btn"
          onClick={() => {
            setShowComments(true);
          }}
        >
        </div>
      </div>

      <CommentWrapper
        placeHolder={WriteYourCommentHere}
        placeHolderReply={WriteYourReplyHere}
        initailComments={comments}
        referenceId={id}
        commentRequestSuccess={(comment) => {
          let updatedComment = { ...comment };
          if (comment.attachmentFile) {
            updatedComment = {
              ...comment,
              attachments: comment.attachments.map((attachment) => ({
                path: (window.URL || window.webkitURL).createObjectURL(
                  attachment.file
                ),
                attachmentName: attachment.file.name,
              })),
            };
          }

          dispatch(
            feedSlice.actions.onSaveComment({
              comment: updatedComment,
            })
          );
        }}
        showComments={showComments}
        isDetailViewOpen={isDetailViewOpen}
        reactionModule={reactionModule}
        setShowComments={setShowComments}
      />
      {commentCount > 3 && showComments && (
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
