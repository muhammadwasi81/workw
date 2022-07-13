import React from "react";
import LikeIcon from "../../../../../../../content/NewContent/NewsFeed/svg/like.svg";
import CommentIcon from "../../../../../../../content/NewContent/NewsFeed/svg/comment.svg";
import ShareIcon from "../../../../../../../content/NewContent/NewsFeed/svg/share.svg";
import Reactions from "../../../../../../sharedComponents/reactionBox/index";
import CommentComposer from "../../../../../../sharedComponents/Comment/Composer";
import CommentItem from "../../../../../../sharedComponents/Comment/commentItem";
import moment from "moment";
import { useDispatch } from "react-redux";
import { feedSlice } from "../../../../store/slice";

const PostFooter = ({ comments, commentCount, reactionCount, id, isOpen }) => {
  const dispatch = useDispatch();
  const filterComments = comments.length > 3 ? comments.slice(0, 3) : comments;

  return (
    <div className="post-footer">
      <div className="post-count">
        <div className="reactionCount">
          <img src={LikeIcon} alt="" />
          <a href="">{reactionCount}</a>
        </div>
        <div className="commentCount">
          <a href=""> {commentCount} Comments</a>
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
              <div> Like</div>
            </div>
          </Reactions>
        </div>
        <div className="btn" onClick={() => {}}>
          <div>
            <img src={CommentIcon} alt="" />
          </div>
          <div> Comment</div>
        </div>
        <div className="btn">
          <div>
            <img src={ShareIcon} alt="" />
          </div>
          <div> Share</div>
        </div>
      </div>
      <CommentComposer
        referenceId={id}
        afterSuccess={(comment) =>
          dispatch(feedSlice.actions.onSaveComment({ comment }))
        }
      />
      {filterComments.map(
        ({ comment, creator, createDate, id, parentId, referenceId }) => {
          const { designation, name, image } = creator;
          var ts = moment.utc(createDate);
          ts.local().format("D-MMM-Y");

          return (
            <CommentItem
              content={comment}
              id={id}
              key={id}
              commentTime={moment(ts).fromNow()}
              youLikeType={0}
              likeCounter={2}
              creator={{
                name,
                image,
                designation,
              }}
            />
          );
        }
      )}
      {comments.length > 3 && (
        <p className="viewComments" onClick={() => isOpen(true)}>
          View All Comments
        </p>
      )}
    </div>
  );
};

export default PostFooter;
