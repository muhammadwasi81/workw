import React, { useContext } from "react";
import CommentIcon from "../../../../../../../content/NewContent/NewsFeed/svg/comment.svg";
import Reactions from "../../../../../../sharedComponents/reactionBox/index";
import { useDispatch } from "react-redux";
import { addFeedReaction, feedSlice } from "../../../../store/slice";
import { useNavigate } from "react-router-dom";
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
import { addReaction, getAllReactionsAction } from "../../../../store/actions";
import { useState } from "react";
import PostShareContent from "./PostShareContent";
import { handleItemDetailModal } from "../../../../../../../utils/Shared/store/slice";
import ItemDetailModal from "../../../../../../sharedComponents/ItemDetails";
import { useSelector } from "react-redux";
import { useEffect } from "react";

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
  const {
    postCompose: { reactionMembersData },
  } = useSelector((state) => state.feedSlice);
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [visible, setVisible] = useState(false);
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
    if (myReaction === ReactionType.NoReaction) {
      dispatch(
        addFeedReaction({
          referenceId: id,
          reactionMode: "click",
          ReactionType: ReactionType.NoReaction,
          isDetail,
        })
      );
      dispatch(
        addReaction({
          referenceId: id,
          reactionModule,
          reactionType: ReactionType.NoReaction,
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

  const handleOpenMembers = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setVisible(!visible);

    dispatch(
      getAllReactionsAction({
        id: id,
        module: reactionModule,
      })
    );
  };

  useEffect(() => {
    if (visible) {
      dispatch(handleItemDetailModal(true));
    }
  }, [visible]);
  return (
    <>
      <div className="post-footer">
        <div className="post-count h-[20px]">
          <div className="reactionCount">
            <span>
              <img
                src={reactions[myReaction]}
                alt={reactionDescription[myReaction]}
              />
            </span>
            <span
              className="cursor-pointer"
              onClick={(e) => handleOpenMembers(e)}
            >
              {reactionCount}
            </span>
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
            className={`btn ${myReaction === ReactionType.Like ? "on" : ""}`}
            onClick={() =>
              handleAddReaction(
                myReaction === ReactionType.Like ||
                  myReaction === ReactionType.Celebrate ||
                  myReaction === ReactionType.Support ||
                  myReaction === ReactionType.Love ||
                  myReaction === ReactionType.Insightful ||
                  myReaction === ReactionType.Curious
                  ? 0
                  : 1,
                id
              )
            }
          >
            <Reactions
              direction={Direction}
              onUpdate={(e) => {
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
              onLikeBtnClick={() =>
                handleAddReaction(ReactionType.NoReaction, id)
              }
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
              <img src={CommentIcon} alt="commentIcon" />
            </div>
            <div> {Comment}</div>
          </div>
          <PostShareContent postId={id} />
          {/* <Popover
          placement="bottom"
          content={<PostShareContent />}
          trigger="click"
          overlayClassName="share-feed__content w-[250px]"
        >
          <div className="btn">
            <div>
              <RiShareForwardLine className="text-3xl" />
            </div>
            <div> {Share}</div>
          </div>
        </Popover> */}
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
          myReaction={myReaction}
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
      <ItemDetailModal
        // data={reactionMembersData}
        isDeleteDisabled={true}
        addEnabled={false}
        addFunc={false}
        onDelete={false}
        isSearch={false}
        openModal={true}
        visible={visible}
        setVisible={(data) => setVisible(data)}
        children={reactionMembersData.map((x) => (
          <div className="flex items-center mb-2">
            <div>
              <img
                src={x.user.image}
                alt={x.user.name}
                style={{
                  borderRadius: "50%",
                  height: "40px",
                  width: "40px",
                  cursor: "pointer",
                }}
              />
            </div>
            <div className="ml-2 font-semibold">
              <span>{x.user.name}</span>
              <br />
              {x.user.email}
            </div>
            <img
              className="w-[30px] h-[30px] rounded-full cursor-pointer ml-auto"
              src={reactions[x.reactionType]}
              alt="profile"
            />
          </div>
        ))}
      />
    </>
  );
};

export default PostFooter;
