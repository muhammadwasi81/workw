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
import { RiShareForwardLine } from "react-icons/ri";
import { Popover } from "antd";
import PostShareContent from "./PostShareContent";

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
          myReaction: 1,
        })
      );
      dispatch(
        addReaction({
          referenceId: id,
          reactionModule,
          myReaction: 1,
        })
      );
      return;
    }
    dispatch(
      addFeedReaction({
        referenceId: id,
        reactionMode: "click",
        myReaction,
      })
    );
    dispatch(
      addReaction({
        referenceId: id,
        reactionModule,
        myReaction: 0,
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
          className={`btn on`}
          onClick={() => handleAddReaction(myReaction, id)}
        >
          <Reactions
            direction={Direction}
            onUpdate={(e) => {
              dispatch(
                addFeedReaction({
                  referenceId: id,
                  reactionModule,
                  myReaction: e,
                })
              );
              dispatch(
                addReaction({
                  referenceId: id,
                  reactionModule,
                  myReaction: e,
                })
              );
            }}
            // onLikeBtnClick={() =>
            // 	handleAddReaction(myReaction, id)
            // }
          >
            <div className={`btn on`}>
              <span>
                <img
                  className={
                    ReactionType.Like === myReaction ||
                    ReactionType.NoReaction === myReaction
                      ? "w-[20px] h-[30px]"
                      : " w-[30px] h-[30px]"
                  }
                  src={reactions[myReaction]}
                  alt={reactionDescription[myReaction]}
                />
              </span>
              <div
                className={`text-[${reactionColor[myReaction]}]`}
                style={{ color: reactionColor[myReaction] }}
              >
                {reactionDescription[myReaction]}
              </div>
            </div>
          </Reactions>
        </div>
        <div
          className="btn"
          onClick={() => {
            setShowComments(true);
          }}
        >
          <div>
            <img src={CommentIcon} alt="" />
          </div>
          <div> {Comment}</div>
        </div>
        <Popover
          placement="bottom"
          content={<PostShareContent />}
          trigger="click"
          overlayClassName="share-feed__content w-[250px]"
        >
          <div className="btn">
            <div>
              <RiShareForwardLine className="text-3xl" />
              {/* <img src={ShareIcon} alt="" /> */}
            </div>
            <div> {Share}</div>
          </div>
        </Popover>
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
