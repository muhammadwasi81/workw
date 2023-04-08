import React, { useContext, useState } from "react";
import "./style.css";
import CommentComposer from "./Composer";
import { getAllComment } from "./services";
import CommentBubble from "./CommentBubble";
import { LanguageChangeContext } from "../../../utils/localization/localContext/LocalContext";
import { CommentDictionary } from "./localization";

const CommentItem = ({
  comment,
  initialMentions,
  mentionedUser,
  user,
  handleLike,
  likeClass,
}) => {
  let {
    referenceId,
    isReply = false,
    creator,
    createDate,
    content,
    type,
    parentId,
    module,
    attachments,
    attachmentCount,
    attachmentFile,
    reactionCount,
    cssClass,
    mentions,
  } = comment;
  const [openComposer, setOpenComposer] = useState(false);
  const [replies, setReplies] = useState([]);
  const toggleReply = (referenceId, parentId) => {
    setOpenComposer((prevState) => {
      if (!prevState) getRepliesByParent(referenceId, parentId);
      return !prevState;
    });
  };
  const getRepliesByParent = async (referenceId, parentId) => {
    const response = await getAllComment(referenceId, parentId);
    if (response) {
      const replies = response.map((reply) => {
        const res = replies.filter((res) => res.id === reply.id);

        if (res.length > 0) return res[0];
        else return reply;
      });
      setReplies(replies);
    }
  };
  const { userLanguage } = useContext(LanguageChangeContext);
  const { Reply, Like, WriteYourReplyHere } = CommentDictionary[userLanguage];

  return (
    <div
      className={
        "CommentItem " +
        (isReply ? "ReplyComment " : "") +
        (type === 2 ? "SystemComment" : "")
      }
    >
      <div style={{ flex: "1" }}>
        <div>
          <CommentBubble
            user={user}
            creator={creator}
            content={content}
            mentionedUser={mentionedUser}
            date={createDate}
            attachments={attachments}
            attachmentCount={attachmentCount}
            attachmentFile={attachmentFile}
            type={type}
            mentions={mentions}
          />
          {type !== 2 && (
            <div className="likeReplyCont">
              <div className={cssClass} onClick={() => handleLike(parentId)}>
                {/* {Like} &nbsp; {reactionCount > 0 ? reactionCount : ""} */}
                {Like}
              </div>
              <div onClick={() => toggleReply(referenceId, parentId)}>
                {Reply}
              </div>
            </div>
          )}
        </div>
        <div>
          {openComposer && (
            <React.Fragment>
              {replies?.map(
                ({
                  id: Rid,
                  creator: replyCreator,
                  createDate: replyCreateDate,
                  comment: replyContent,
                  mentions: replyMentionedUser,
                  attachments,
                }) => {
                  return (
                    <React.Fragment key={Rid}>
                      <div
                        className={
                          "CommentItem " + (isReply ? "ReplyComment" : "")
                        }
                      >
                        <CommentBubble
                          user={user}
                          content={replyContent}
                          mentionedUser={replyMentionedUser}
                          date={replyCreateDate}
                          attachments={attachments}
                        />
                      </div>
                      <div className="likeReplyCont">
                        <div onClick={() => handleLike(Rid)}>{Like}</div>
                      </div>
                    </React.Fragment>
                  );
                }
              )}

              <CommentComposer
                module={module}
                initialMentions={initialMentions}
                placeHolder={WriteYourReplyHere}
                referenceId={referenceId}
                parentId={parentId}
                commentRequestSuccess={(comment) =>
                  setReplies((preValue) => [...preValue, comment])
                }
              />
            </React.Fragment>
          )}
        </div>
      </div>
    </div>
  );
};
export default CommentItem;
