import PostModel from "./PostModel";
import PostAttachment from "./PostAttachment";
import Polls from "../../../../../../sharedComponents/Polls";
import { renderTitleWithMentions } from "../../../../../../../utils/base";

const PostSection = ({ post, isOpen, onOpen }) => {
  const {
    title = "",
    attachments = [],
    pollOptions = [],
    voteCount,
    mentions = [],
  } = post;

  return (
    <>
      <div className="post-section">
        <p
          dangerouslySetInnerHTML={{
            __html: renderTitleWithMentions(title, mentions),
          }}
        ></p>
        {pollOptions.length > 1 && (
          <Polls options={pollOptions} voteCounts={voteCount} />
        )}
        <div className="post-section-attachments">
          {attachments.length > 0 && (
            <PostAttachment attachments={attachments} onOpen={onOpen} />
          )}
        </div>
      </div>
      {/* you can also pass a component to leftComponent which will render on the leftside // put false in it if you dont component */}
      <PostModel
        id={post.id}
        setModelState={() => onOpen(false)}
        open={isOpen}
        leftComponent
      />
    </>
  );
};

export default PostSection;
