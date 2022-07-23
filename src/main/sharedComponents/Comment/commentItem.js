import React, { useState } from "react";
import Avatar from "../Avatar/avatarOLD";
import "./style.css";
import DotesIcon from "./assets/dotes.svg";
import CommentComposer from "./Composer";
import { getAllComment } from "./services";
import moment from "moment";
import { renderTitleWithMentions } from "../../../utils/base";

const CommentItem = ({ comment, mentions, commentMentions }) => {
  let {
    referenceId,
    isReply = false,
    creator,
    commentTime = "",
    content = "",
    handleLike,
    parentId,
  } = comment;
  let { name, image, designation } = creator;
  const [openComposer, setOpenComposer] = useState(false);
  const [replies, setReplies] = useState([]);
  const toggleReply = (referenceId, parentId) => {
    setOpenComposer((prevState) => {
      if (!prevState) getReply(referenceId, parentId);
      return !prevState;
    });
  };
  const getReply = async (referenceId, parentId) => {
    const response = await getAllComment(referenceId, parentId);
    const replies = response.map((reply) => {
      const res = response.filter((res) => res.id === reply.id);
      if (res.length > 0) return res[0];
      else return reply;
    });
    setReplies(replies);
  };

  return (
    <div className={"CommentItem " + (isReply ? "ReplyComment" : "")}>
      <div>
        <Avatar src={image} name={name} size={35} round={true} />
      </div>
      <div style={{ flex: "1" }}>
        <div className="CommentBubble">
          <div className="CommentHeader">
            <div className="CommentHeaderDet">
              <div className="name">{name}</div>
              <div className="designation">{designation}</div>
            </div>
            <div className="CommentHeaderIcon">
              <img src={DotesIcon} alt="" />
              <span className="time">{commentTime}</span>
            </div>
          </div>

          <p
            dangerouslySetInnerHTML={{
              __html: renderTitleWithMentions(content, commentMentions),
            }}
          ></p>
        </div>

        <div className="likeReplyCont">
          <div onClick={() => handleLike(referenceId)}>Like</div>
          <div onClick={() => toggleReply(referenceId, parentId)}>Reply</div>
        </div>
        <div>
          {openComposer && (
            <React.Fragment>
              {replies?.map(
                ({
                  id: Rid,
                  creator: Rcreator,
                  createDate: RcreateDate,
                  comment: Rcomment,
                }) => {
                  var ts = moment.utc(RcreateDate);
                  ts.local().format("D-MMM-Y");
                  return (
                    <React.Fragment key={Rid}>
                      <div
                        className={
                          "CommentItem " + (isReply ? "ReplyComment" : "")
                        }
                      >
                        <div>
                          <Avatar
                            src={Rcreator.image}
                            name={Rcreator.commentTimename}
                            size={35}
                            round={true}
                          />
                        </div>
                        <div style={{ flex: "1" }}>
                          <div className="CommentBubble">
                            <div className="CommentHeader">
                              <div className="CommentHeaderDet">
                                <div className="name">{Rcreator.name}</div>
                                <div className="designation">
                                  {Rcreator.designation}
                                </div>
                              </div>
                              <div className="CommentHeaderIcon">
                                <img src={DotesIcon} alt="" />
                                <span className="time">
                                  {moment(ts).fromNow()}
                                </span>
                              </div>
                            </div>

                            <div>{Rcomment}</div>
                          </div>
                          <div className="likeReplyCont">
                            <div onClick={() => handleLike(referenceId)}>
                              Like
                            </div>
                          </div>
                        </div>
                      </div>
                    </React.Fragment>
                  );
                }
              )}

              <CommentComposer
                mentions={mentions}
                placeHolder={"Write Your Reply Here."}
                referenceId={referenceId}
                parentId={parentId}
                afterSuccess={(comment) =>
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
