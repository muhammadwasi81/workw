import React, { useContext, useState } from "react";
import "./style.css";
import CommentComposer from "./Composer";
import { getAllComment } from "./services";
import CommentBubble from "./CommentBubble";
import { LanguageChangeContext } from "../../../utils/localization/localContext/LocalContext";
import { CommentDictionary } from "./localization";
import { commentTypeEnum } from "./enum/enum";
import Reactions from "../reactionBox";
import {
  addCommentsReaction,
  addFeedReaction,
} from "../../features/feed/store/slice";
import {
  addReaction,
  getAllReactionsAction,
} from "../../features/feed/store/actions";
import { ReactionType } from "../../features/feed/utils/constants";
import {
  reactionColor,
  reactionDescription,
  reactions,
} from "../../features/feed/ui/reactions/reactions";
import { useDispatch, useSelector } from "react-redux";
import { handleItemDetailModal } from "../../../utils/Shared/store/slice";
import ItemDetailModal from "../ItemDetails";
import { ReactionModuleEnum } from "../../../utils/Shared/enums/enums";
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

    likeCounter,
    reactionCount,
    reactionModule,
    cssClass,
    mentions,
    myReaction,
  } = comment;
  console.log(reactionModule, "reactionModule");
  const [openComposer, setOpenComposer] = useState(false);
  const [replies, setReplies] = useState([]);
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const {
    postCompose: { reactionMembersData },
  } = useSelector((state) => state.feedSlice);
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
  const handleOpenReactions = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setVisible(!visible);
    dispatch(handleItemDetailModal(true));
    dispatch(
      getAllReactionsAction({
        id: referenceId,
        module: reactionModule,
      })
    );
  };
  const { userLanguage } = useContext(LanguageChangeContext);
  const { Reply, Like, WriteYourReplyHere, Direction } = CommentDictionary[
    userLanguage
  ];

  return (
    <>
      <div
        className={
          "CommentItem " +
          (isReply ? "ReplyComment " : "") +
          (type === commentTypeEnum.SystemComment ? "SystemComment" : "")
        }
      >
        <div className="flex-1">
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
            {type !== commentTypeEnum.SystemComment && (
              <div className="likeReplyCont">
                <div
                  className={`btn ${myReaction ? "liked" : "no"}`}
                  onClick={() =>
                    handleLike(ReactionType.NoReaction, referenceId, parentId)
                  }
                >
                  <Reactions
                    direction={Direction}
                    onUpdate={(e) => {
                      dispatch(
                        addCommentsReaction({
                          referenceId: referenceId,
                          reactionModule: ReactionModuleEnum.FeedComment,
                          reactionType: e,
                          id: parentId,
                        })
                      );
                      dispatch(
                        addReaction({
                          referenceId: parentId,
                          reactionModule,
                          reactionType: e,
                        })
                      );
                    }}
                    onLikeBtnClick={() =>
                      handleLike(ReactionType.NoReaction, referenceId, parentId)
                    }
                  >
                    <div className={`flex justify-between gap-1 btn on`}>
                      <span>
                        <img
                          className={
                            ReactionType.Like === myReaction ||
                            ReactionType.NoReaction === myReaction
                              ? "w-[20px] h-[20px]"
                              : " w-[20px] h-[20px]"
                          }
                          src={reactions[myReaction || 0]}
                          alt={reactionDescription[myReaction || 0]}
                        />
                      </span>
                      <span
                        className="cursor-pointer"
                        onClick={(e) => handleOpenReactions(e)}
                      >
                        {reactionCount}
                      </span>
                      <div
                        className={`text-[${reactionColor[myReaction || 0]}]`}
                        style={{ color: reactionColor[myReaction || 0] }}
                      >
                        {reactionDescription[myReaction || 0]}
                      </div>
                    </div>
                  </Reactions>
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
      <ItemDetailModal
        // data={reactionMembersData}
        isDeleteDisabled={true}
        addEnabled={false}
        addFunc={false}
        onDelete={false}
        isSearch={false}
        openModal={true}
        visible={visible}
        setVisible={(data) => setVisible(data)}
        children={reactionMembersData.map((x) => (
          <div className="flex items-center mb-2">
            <div>
              <img
                src={x.user.image}
                alt={x.user.name}
                style={{
                  borderRadius: "50%",
                  height: "40px",
                  width: "40px",
                  cursor: "pointer",
                }}
              />
            </div>
            <div className="ml-2 font-semibold">
              <span>{x.user.name}</span>
              <br />
              {x.user.email}
            </div>
            <img
              className="w-[30px] h-[30px] rounded-full cursor-pointer ml-auto"
              src={reactions[x.reactionType]}
              alt="profile"
            />
          </div>
        ))}
      />
    </>
  );
};
export default CommentItem;
