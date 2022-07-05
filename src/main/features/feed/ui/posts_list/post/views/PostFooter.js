import React from "react";
import LikeIcon from "../../../../../../../content/NewContent/NewsFeed/svg/like.svg";
import CommentIcon from "../../../../../../../content/NewContent/NewsFeed/svg/comment.svg";
import ShareIcon from "../../../../../../../content/NewContent/NewsFeed/svg/share.svg";
import Reactions from "../../../../../../sharedComponents/reactionBox/index";
import CommentComposer from "../../../../../../sharedComponents/Comment/Composer";
import CommentItem from "../../../../../../sharedComponents/Comment/commentItem";
import { useSelector } from "react-redux";

const PostFooter = () => {
  const {
    userSlice: { user },
  } = useSelector((state) => state);
  return (
    <div className="post-footer">
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
        onCommentSend={(data) => console.log("onCommentSend", data)}
        user={user}
      />
      <CommentItem
        content="Waoo its great"
        id="id123"
        commentTime=" 2 day ago"
        youLikeType={0}
        likeCounter={2}
        creator={{
          name: "Abu Bakar Memon",
          image:
            "https://konnect.im/upload/2021/3/5325454b-1c5d-40f1-b95d-df0fad2d4da9.jpeg",
          designation: "React Developer",
        }}
      />
    </div>
  );
};

export default PostFooter;
