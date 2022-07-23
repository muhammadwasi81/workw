import moment from "moment";
import React, { useEffect, useState } from "react";
import { STRINGS } from "../../../utils/base";
import CommentItem from "./commentItem";
import CommentComposer from "./Composer";
import { getAllComment } from "./services";

function CommentWrapper({
  initailComments = [],
  referenceId,
  module = 1,
  afterSuccess,
  placeHolder,
  isCommentLoad = false,
  mentions,
}) {
  const [comments, setComments] = useState([]);
  useEffect(() => {
    setComments([...initailComments]);
  }, [initailComments]);

  useEffect(() => {
    isCommentLoad && getComments(referenceId, STRINGS.DEFAULTS.guid, module);
  }, []);

  const getComments = async (referenceId, parentId, module) => {
    const response = await getAllComment(referenceId, parentId, module);
    setComments([...response]);
  };

  return (
    <div className="commentWrapper">
      <CommentComposer
        referenceId={referenceId}
        mentions={mentions}
        placeHolder={placeHolder}
        module={module}
        afterSuccess={(comment) => {
          setComments((preValue) => [...preValue, comment]);
          afterSuccess && afterSuccess(comment);
        }}
      />
      <div className="comments">
        {comments.map(
          ({
            comment,
            creator,
            createDate,
            id: commentID,
            referenceId,
            mentions: commentMentions,
          }) => {
            const { designation, name, image } = creator;
            var ts = moment.utc(createDate);
            ts.local().format("D-MMM-Y");
           
            return (
              <CommentItem
                mentions={mentions}
                commentMentions={commentMentions}
                comment={{
                  content: comment,
                  parentId: commentID,
                  referenceId: referenceId,
                  commentTime: moment(ts).fromNow(),
                  youLikeType: 0,
                  likeCounter: 0,
                  creator: {
                    name,
                    image,
                    designation,
                  },
                }}
              />
            );
          }
        )}
      </div>
    </div>
  );
}

export default CommentWrapper;
