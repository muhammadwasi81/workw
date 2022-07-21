import moment from "moment";
import React, { useEffect, useState } from "react";
import CommentItem from "./commentItem";
import CommentComposer from "./Composer";

function CommentWrapper({
  initailComments = [],
  referenceId,
  module,
  afterSuccess,
  placeHolder,
}) {
  const [comments, setComments] = useState([]);
  useEffect(() => {
    setComments([...initailComments]);
  }, [initailComments]);

  return (
    <div className="commentWrapper">
      <CommentComposer
        placeHolder={placeHolder}
        referenceId={referenceId}
        module={module}
        afterSuccess={(comment) => {
          afterSuccess && afterSuccess(comment);
          setComments((preValue) => [...preValue, comment]);
        }}
      />
      <div className="comments">
        {comments.map(
          ({ comment, creator, createDate, id: commentID, referenceId }) => {
            const { designation, name, image } = creator;
            var ts = moment.utc(createDate);
            ts.local().format("D-MMM-Y");

            return (
              <CommentItem
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
