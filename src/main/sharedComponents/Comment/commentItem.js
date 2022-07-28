import React, { useState } from "react";
import "./style.css";
import CommentComposer from "./Composer";
import { getAllComment } from "./services";
import CommentBubble from "./CommentBubble";

const CommentItem = ({ comment, initialMentions, mentionedUser }) => {
  let {
    referenceId,
    isReply = false,
    creator,
    createDate,
    content,
    handleLike,
    parentId,
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
        const res = response.filter((res) => res.id === reply.id);
        if (res.length > 0) return res[0];
        else return reply;
      });
      setReplies(replies);
    }
  };

  return (
    <div className={"CommentItem " + (isReply ? "ReplyComment" : "")}>
      <div style={{ flex: "1" }}>
        <div>
          <CommentBubble
            user={creator}
            content={content}
            mentionedUser={mentionedUser}
            date={createDate}
          />

          <div className="likeReplyCont">
            <div onClick={() => handleLike(referenceId)}>Like</div>
            <div onClick={() => toggleReply(referenceId, parentId)}>Reply</div>
          </div>
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
                }) => {
                  console.log(replyCreator);
                  return (
                    <React.Fragment key={Rid}>
                      <div
                        className={
                          "CommentItem " + (isReply ? "ReplyComment" : "")
                        }
                      >
                        <CommentBubble
                          user={replyCreator}
                          content={replyContent}
                          mentionedUser={replyMentionedUser}
                          date={replyCreateDate}
                        />
                      </div>
                      <div className="likeReplyCont">
                        <div onClick={() => handleLike(referenceId)}>Like</div>
                      </div>
                    </React.Fragment>
                  );
                }
              )}

              <CommentComposer
                initialMentions={initialMentions}
                placeHolder={"Write Your Reply Here."}
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
