import "./stylesheet/Post.css";
import PostHeader from "./views/PostHeader";
import PostSection from "./views/PostSection";
import PostFooter from "./views/PostFooter";

const Post = ({ post }) => {
  const { creator, isPinnedPost, tags, createDate, privacyId, attachments } =
    post;

  return (
    <div className="post">
      <PostHeader
        privacyId={privacyId}
        creator={creator}
        isPinnedPost={isPinnedPost}
        tags={tags}
        createDate={createDate}
      />
      <PostSection post={post} attachments={attachments} />
      <PostFooter />
    </div>
  );
};

export default Post;
