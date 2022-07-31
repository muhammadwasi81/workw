import React, { useContext } from "react";
import LikeIcon from "../../../../../../../content/NewContent/NewsFeed/svg/like.svg";
import CommentIcon from "../../../../../../../content/NewContent/NewsFeed/svg/comment.svg";
import ShareIcon from "../../../../../../../content/NewContent/NewsFeed/svg/share.svg";
import Reactions from "../../../../../../sharedComponents/reactionBox/index";
import { useDispatch } from "react-redux";
import { feedSlice } from "../../../../store/slice";
import { useNavigate } from "react-router-dom";
import CommentWrapper from "../../../../../../sharedComponents/Comment/CommentWrapper";
import { LanguageChangeContext } from "../../../../../../../utils/localization/localContext/LocalContext";
import { FeedDictionary } from "../../../../localization";

const PostFooter = ({
  attachments,
  comments = [],
  commentCount,
  reactionCount,
  id,
  isOpen,
  viewAllComments,
}) => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { userLanguage } = useContext(LanguageChangeContext);
  const { Post } = FeedDictionary[userLanguage];
  const {
    Comments,
    Comment,
    Share,
    Like,
    WriteYourCommentHere,
    WriteYourReplyHere,
  } = Post;

  return (
    <div className="post-footer">
      <div className="post-count">
        <div className="reactionCount">
          <img src={LikeIcon} alt="" />
          <a href={reactionCount}>{reactionCount}</a>
        </div>
        <div className="commentCount">
          <a href={commentCount}>
            {commentCount} {Comments}
          </a>
        </div>
      </div>
      <div className="post-events">
        <div className={`btn on`}>
          <Reactions
            onUpdate={(e) => {
              console.log(e);
            }}
          >
            <div className={`btn on`}>
              <div>
                <img src={LikeIcon} alt="" />
              </div>
              <div> {Like}</div>
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
        commentRequestSuccess={(comment) =>
          dispatch(feedSlice.actions.onSaveComment({ comment }))
        }
        initialMentions={[]}
      />
      {viewAllComments && comments.length > 3 && (
        <p
          className="viewComments"
          onClick={() => {
            if (attachments.length > 0) isOpen(true);
            else navigate(`/newsFeedDetails/${id}`);
          }}
        >
          View All Comments
        </p>
      )}
    </div>
  );
};

export default PostFooter;
