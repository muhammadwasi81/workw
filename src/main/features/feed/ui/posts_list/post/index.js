import "./stylesheet/Post.css";
import PostHeader from "./views/PostHeader";
import PostSection from "./views/PostSection";
import PostFooter from "./views/PostFooter";
import { useState } from "react";

const Post = ({ post }) => {
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
  const [modelState, setmodelState] = useState(false);
  const openModel = (value) => {
    setmodelState(value);
  };
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
      />
    </div>
  );
};

export default Post;
