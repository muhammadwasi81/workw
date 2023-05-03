import PostHeader from "../../features/feed/ui/posts_list/post/views/PostHeader";
import PostSection from "../../features/feed/ui/posts_list/post/views/PostSection";
import PostFooter from "../../features/feed/ui/posts_list/post/views/PostFooter";

const PostModalContent = ({ singlePost }) => {
  return (
    <div className="post">
      <PostHeader
        id={singlePost.referenceId}
        privacyId={singlePost.privacyId}
        creator={singlePost.creator}
        isPinnedPost={singlePost.isPinnedPost}
        tags={singlePost.tags}
        createDate={singlePost.createDate}
      />
      <PostSection
        post={singlePost}
        attachments={singlePost.attachments}
        isOpen={false}
        id={singlePost.id}
        isDetail={{}}
      />
      <PostFooter
        isDetail={singlePost.isDetail}
        id={singlePost.id}
        comments={singlePost.comments}
        reactionCount={singlePost.reactionCount}
        commentCount={singlePost.commentCount}
        isOpen={singlePost.openModel}
        viewAllComments={singlePost.viewAllComments}
        attachments={singlePost.attachments}
        reactionModule={singlePost.reactionModule}
        referenceType={singlePost.referenceType}
        referenceId={singlePost.referenceId}
        isDetailViewOpen={singlePost.modelState}
        myReaction={singlePost.myReaction}
      />
    </div>
  );
};

export default PostModalContent;
