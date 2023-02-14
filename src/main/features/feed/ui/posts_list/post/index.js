import "./stylesheet/Post.css";
import PostHeader from "./views/PostHeader";
import PostSection from "./views/PostSection";
import PostFooter from "./views/PostFooter";
import { useState } from "react";

const Post = ({
  post = { attachments: [] },
  viewAllComments,
  reactionModule,
  referenceType,
  referenceId,
  isDetail = false,
}) => {
  const [modelState, setmodelState] = useState(false);
  const openModel = (value) => {
    setmodelState(value);
  };

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
    myReaction,
  } = post;
  return (
    <div className="post">
      <PostHeader
        id={id}
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
        id={id}
        isDetail={isDetail}
      />
      <PostFooter
        isDetail={isDetail}
        id={id}
        comments={comments}
        reactionCount={reactionCount}
        commentCount={commentCount}
        isOpen={openModel}
        viewAllComments={viewAllComments}
        attachments={attachments}
        reactionModule={reactionModule}
        referenceType={referenceType}
        referenceId={referenceId}
        isDetailViewOpen={modelState}
        myReaction={myReaction}
      />
    </div>
  );
};

export default Post;
